#!/usr/bin/env bash
#
# Automated development workflow script for Nuxt Theme Builder
# Cross-platform version (Linux/macOS/CI)
#
# Usage:
#   ./scripts/dev-workflow.sh [options]
#
# Options:
#   --skip-tests      Skip running unit tests
#   --run-e2e         Include E2E smoke tests
#   --auto-commit     Prompt for commit message after checks
#   --message "msg"   Commit with provided message
#   --push            Push to remote after commit
#   --dry-run         Show what would be done without changes
#   --help            Show this help message

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Default options
SKIP_TESTS=false
RUN_E2E=false
AUTO_COMMIT=false
COMMIT_MESSAGE=""
PUSH=false
DRY_RUN=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --run-e2e)
            RUN_E2E=true
            shift
            ;;
        --auto-commit)
            AUTO_COMMIT=true
            shift
            ;;
        --message)
            COMMIT_MESSAGE="$2"
            AUTO_COMMIT=true
            shift 2
            ;;
        --push)
            PUSH=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help)
            head -30 "$0" | tail -20
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Helper functions
step() {
    echo -e "\n${MAGENTA}▶ $1${NC}"
}

success() {
    echo -e "  ${GREEN}✓ $1${NC}"
}

failure() {
    echo -e "  ${RED}✗ $1${NC}"
}

info() {
    echo -e "  ${CYAN}ℹ $1${NC}"
}

warn() {
    echo -e "  ${YELLOW}⚠ $1${NC}"
}

run_cmd() {
    local name="$1"
    local cmd="$2"
    local continue_on_error="${3:-false}"

    step "$name"

    if [ "$DRY_RUN" = true ]; then
        info "[DRY RUN] Would execute: $cmd"
        return 0
    fi

    if eval "$cmd"; then
        success "$name completed"
        return 0
    else
        if [ "$continue_on_error" = true ]; then
            warn "$name had issues but continuing"
            return 0
        else
            failure "$name failed"
            return 1
        fi
    fi
}

validate_commit_message() {
    local msg="$1"
    local pattern="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?:[[:space:]].{1,100}$"

    if [[ $msg =~ $pattern ]]; then
        return 0
    else
        failure "Invalid commit message format"
        info "Expected: <type>(<scope>): <description>"
        info "Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
        return 1
    fi
}

# ============================================================================
# MAIN WORKFLOW
# ============================================================================

echo -e "\n${MAGENTA}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${MAGENTA}║         NUXT THEME BUILDER - DEVELOPMENT WORKFLOW              ║${NC}"
echo -e "${MAGENTA}╚════════════════════════════════════════════════════════════════╝${NC}"

if [ "$DRY_RUN" = true ]; then
    warn "DRY RUN MODE - No changes will be made"
fi

# Check we're in the right directory
if [ ! -f "package.json" ]; then
    failure "Must be run from project root (package.json not found)"
    exit 1
fi

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    failure "pnpm is required but not installed"
    exit 1
fi

# Step 1: Check status
step "Checking repository status"
if [ -z "$(git status --porcelain)" ]; then
    info "No changes detected"
    echo -e "\n${GREEN}✨ Nothing to do!${NC}"
    exit 0
fi
git status --short

# Step 2: Lint with auto-fix
run_cmd "ESLint (with auto-fix)" "pnpm lint:fix" true

# Verify lint passes
if ! pnpm lint > /dev/null 2>&1; then
    failure "Lint errors remain after auto-fix. Please fix manually."
    exit 1
fi

# Step 3: Format
run_cmd "Prettier format" "pnpm format" true

# Step 4: Typecheck
run_cmd "TypeScript typecheck" "pnpm typecheck" || exit 1

# Step 5: Unit tests
if [ "$SKIP_TESTS" = false ]; then
    run_cmd "Unit tests (Vitest)" "pnpm test" || exit 1
else
    step "Unit tests"
    info "Skipped (--skip-tests flag)"
fi

# Step 6: E2E tests (optional)
if [ "$RUN_E2E" = true ]; then
    run_cmd "E2E smoke tests (Playwright)" "pnpm test:e2e:smoke" true
else
    step "E2E tests"
    info "Skipped (use --run-e2e to include)"
fi

# Step 7: Stage changes
step "Staging changes"
if [ "$DRY_RUN" = false ]; then
    git add -A
    success "All changes staged"
else
    info "[DRY RUN] Would stage all changes"
fi

# Step 8: Commit
if [ "$AUTO_COMMIT" = true ]; then
    step "Preparing commit"

    if [ -z "$COMMIT_MESSAGE" ]; then
        echo ""
        read -p "  Enter commit message: " COMMIT_MESSAGE
    fi

    if ! validate_commit_message "$COMMIT_MESSAGE"; then
        exit 1
    fi

    if [ "$DRY_RUN" = false ]; then
        git commit -m "$COMMIT_MESSAGE"
        success "Committed: $COMMIT_MESSAGE"
    else
        info "[DRY RUN] Would commit: $COMMIT_MESSAGE"
    fi

    # Step 9: Push
    if [ "$PUSH" = true ]; then
        step "Pushing to remote"
        if [ "$DRY_RUN" = false ]; then
            git push
            success "Pushed to remote"
        else
            info "[DRY RUN] Would push to remote"
        fi
    fi
else
    step "Git commit"
    info "Changes staged but not committed (use --auto-commit or --message)"
fi

# Summary
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    WORKFLOW COMPLETED                          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"

if [ "$AUTO_COMMIT" = false ]; then
    info "Next steps:"
    echo "    git commit -m \"<type>(<scope>): <description>\""
    echo "    git push"
fi

exit 0
