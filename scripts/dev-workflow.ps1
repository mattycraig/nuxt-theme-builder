#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated development workflow script for Nuxt Theme Builder.

.DESCRIPTION
    Runs the complete development workflow: lint, format, typecheck, test, and git operations.
    Automatically fixes issues where possible and continues from where it left off.

.PARAMETER SkipTests
    Skip running unit tests.

.PARAMETER RunE2E
    Include E2E smoke tests in the workflow (skipped by default).
    Automatically commit with a prompted message.

.PARAMETER CommitMessage
    Provide commit message directly (implies -AutoCommit).

.PARAMETER Push
    Push to remote after successful commit.

.PARAMETER DryRun
    Show what would be done without making changes.

.EXAMPLE
    .\scripts\dev-workflow.ps1
    # Run full workflow interactively

.EXAMPLE
    .\scripts\dev-workflow.ps1 -CommitMessage "feat: add new feature" -Push
    # Run workflow, commit with message, and push

.EXAMPLE
    .\scripts\dev-workflow.ps1 -SkipTests -DryRun
    # Preview workflow without tests or changes
#>

[CmdletBinding()]
param(
    [switch]$SkipTests,
    [switch]$RunE2E,
    [switch]$AutoCommit,
    [string]$CommitMessage,
    [switch]$Push,
    [switch]$DryRun
)

# Colors for output
$script:Colors = @{
    Success = "Green"
    Error = "Red"
    Warning = "Yellow"
    Info = "Cyan"
    Step = "Magenta"
}

function Write-Step {
    param([string]$Message)
    Write-Host "`n▶ $Message" -ForegroundColor $script:Colors.Step
}

function Write-Success {
    param([string]$Message)
    Write-Host "  ✓ $Message" -ForegroundColor $script:Colors.Success
}

function Write-Failure {
    param([string]$Message)
    Write-Host "  ✗ $Message" -ForegroundColor $script:Colors.Error
}

function Write-Info {
    param([string]$Message)
    Write-Host "  ℹ $Message" -ForegroundColor $script:Colors.Info
}

function Write-Warn {
    param([string]$Message)
    Write-Host "  ⚠ $Message" -ForegroundColor $script:Colors.Warning
}

function Test-Command {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

function Invoke-Step {
    param(
        [string]$Name,
        [string]$Command,
        [switch]$ContinueOnError,
        [switch]$CanFix
    )

    Write-Step $Name

    if ($DryRun) {
        Write-Info "[DRY RUN] Would execute: $Command"
        return $true
    }

    $output = Invoke-Expression $Command 2>&1
    $exitCode = $LASTEXITCODE

    if ($exitCode -eq 0) {
        Write-Success "$Name completed"
        return $true
    }
    else {
        if ($CanFix) {
            Write-Warn "$Name found issues (will attempt to fix)"
        }
        else {
            Write-Failure "$Name failed with exit code $exitCode"
        }

        # Show relevant output
        $output | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "error|Error|ERROR") {
                Write-Host "    $line" -ForegroundColor $script:Colors.Error
            }
            elseif ($line -match "warning|Warning|WARN") {
                Write-Host "    $line" -ForegroundColor $script:Colors.Warning
            }
        }

        if ($ContinueOnError) {
            return $true
        }
        return $false
    }
}

function Get-ChangedFiles {
    $staged = git diff --cached --name-only 2>$null
    $unstaged = git diff --name-only 2>$null
    $untracked = git ls-files --others --exclude-standard 2>$null

    return @{
        Staged = $staged
        Unstaged = $unstaged
        Untracked = $untracked
        HasChanges = ($staged -or $unstaged -or $untracked)
    }
}

function Test-CommitMessage {
    param([string]$Message)

    # Conventional commit pattern
    $pattern = "^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?:\s.{1,100}$"

    if ($Message -match $pattern) {
        return $true
    }

    Write-Failure "Invalid commit message format"
    Write-Info "Expected: <type>(<scope>): <description>"
    Write-Info "Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    Write-Info "Example: feat(editor): add color picker component"
    return $false
}

# ============================================================================
# MAIN WORKFLOW
# ============================================================================

$ErrorActionPreference = "Stop"
$startTime = Get-Date

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor $script:Colors.Step
Write-Host "║         NUXT THEME BUILDER - DEVELOPMENT WORKFLOW              ║" -ForegroundColor $script:Colors.Step
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor $script:Colors.Step

if ($DryRun) {
    Write-Warn "DRY RUN MODE - No changes will be made"
}

# Check we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Failure "Must be run from project root (package.json not found)"
    exit 1
}

# Check for pnpm
if (-not (Test-Command "pnpm")) {
    Write-Failure "pnpm is required but not installed"
    exit 1
}

# ============================================================================
# STEP 1: CHECK GIT STATUS
# ============================================================================
Write-Step "Checking repository status"

$changes = Get-ChangedFiles
if (-not $changes.HasChanges) {
    Write-Info "No changes detected in working directory"
    Write-Host "`n✨ Nothing to do!" -ForegroundColor $script:Colors.Success
    exit 0
}

if ($changes.Staged) {
    Write-Info "Staged files: $($changes.Staged.Count)"
}
if ($changes.Unstaged) {
    Write-Info "Modified files: $($changes.Unstaged.Count)"
}
if ($changes.Untracked) {
    Write-Info "Untracked files: $($changes.Untracked.Count)"
}

# ============================================================================
# STEP 2: LINT WITH AUTO-FIX
# ============================================================================
$lintResult = Invoke-Step -Name "ESLint (with auto-fix)" -Command "pnpm lint:fix" -CanFix

if (-not $lintResult) {
    # Run lint again to check if issues remain
    Write-Step "Re-checking lint status"
    $lintCheck = Invoke-Step -Name "ESLint verification" -Command "pnpm lint" -ContinueOnError

    if (-not $lintCheck) {
        Write-Failure "Lint errors remain after auto-fix. Please fix manually."
        exit 1
    }
}

# ============================================================================
# STEP 3: FORMAT WITH PRETTIER
# ============================================================================
$formatResult = Invoke-Step -Name "Prettier format" -Command "pnpm format" -CanFix

# ============================================================================
# STEP 4: TYPECHECK
# ============================================================================
$typeResult = Invoke-Step -Name "TypeScript typecheck" -Command "pnpm typecheck"

if (-not $typeResult) {
    Write-Failure "TypeScript errors must be fixed before continuing"
    exit 1
}

# ============================================================================
# STEP 5: UNIT TESTS
# ============================================================================
if (-not $SkipTests) {
    $testResult = Invoke-Step -Name "Unit tests (Vitest)" -Command "pnpm test"

    if (-not $testResult) {
        Write-Failure "Unit tests failed. Fix tests before committing."
        exit 1
    }
}
else {
    Write-Step "Unit tests"
    Write-Info "Skipped (--SkipTests flag)"
}

# ============================================================================
# STEP 6: E2E TESTS (OPTIONAL)
# ============================================================================
if ($RunE2E) {
    $e2eResult = Invoke-Step -Name "E2E smoke tests (Playwright)" -Command "pnpm test:e2e:smoke"

    if (-not $e2eResult) {
        Write-Warn "E2E tests failed but continuing..."
    }
}
else {
    Write-Step "E2E tests"
    Write-Info "Skipped (use -RunE2E to include)"
}

# ============================================================================
# STEP 7: STAGE CHANGES
# ============================================================================
Write-Step "Staging changes"

if (-not $DryRun) {
    # Stage all changes (lint/format may have modified files)
    git add -A
    Write-Success "All changes staged"
}
else {
    Write-Info "[DRY RUN] Would stage all changes"
}

# ============================================================================
# STEP 8: COMMIT
# ============================================================================
$shouldCommit = $AutoCommit -or $CommitMessage

if ($shouldCommit) {
    Write-Step "Preparing commit"

    # Get or prompt for commit message
    if (-not $CommitMessage) {
        Write-Host ""
        $CommitMessage = Read-Host "  Enter commit message"
    }

    # Validate commit message
    if (-not (Test-CommitMessage $CommitMessage)) {
        exit 1
    }

    if (-not $DryRun) {
        git commit -m $CommitMessage

        if ($LASTEXITCODE -eq 0) {
            Write-Success "Committed: $CommitMessage"
        }
        else {
            Write-Failure "Commit failed"
            exit 1
        }
    }
    else {
        Write-Info "[DRY RUN] Would commit: $CommitMessage"
    }

    # ============================================================================
    # STEP 9: PUSH (OPTIONAL)
    # ============================================================================
    if ($Push) {
        Write-Step "Pushing to remote"

        if (-not $DryRun) {
            git push

            if ($LASTEXITCODE -eq 0) {
                Write-Success "Pushed to remote"
            }
            else {
                Write-Failure "Push failed"
                exit 1
            }
        }
        else {
            Write-Info "[DRY RUN] Would push to remote"
        }
    }
}
else {
    Write-Step "Git commit"
    Write-Info "Changes staged but not committed (use -AutoCommit or -CommitMessage)"
}

# ============================================================================
# SUMMARY
# ============================================================================
$duration = (Get-Date) - $startTime

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor $script:Colors.Success
Write-Host "║                    WORKFLOW COMPLETED                          ║" -ForegroundColor $script:Colors.Success
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor $script:Colors.Success
Write-Host ""
Write-Host "  Duration: $($duration.TotalSeconds.ToString('F1'))s" -ForegroundColor $script:Colors.Info
Write-Host ""

if (-not $shouldCommit) {
    Write-Info "Next steps:"
    Write-Host "    git commit -m `"<type>(<scope>): <description>`"" -ForegroundColor White
    Write-Host "    git push" -ForegroundColor White
}

exit 0
