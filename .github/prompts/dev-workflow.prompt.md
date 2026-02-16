# Development Workflow

Execute the complete development workflow for this project. Run each step in sequence, automatically fixing issues where possible.

## Steps to Execute

1. **Check Status**: Run `git status --short` to see what changed
2. **Lint**: Run `pnpm lint:fix` - fix auto-fixable issues
3. **Format**: Run `pnpm format` - format all files with Prettier  
4. **Typecheck**: Run `pnpm typecheck` - verify TypeScript types
5. **Test**: Run `pnpm test` - run unit tests
6. **Stage**: Run `git add -A` - stage all changes
7. **Report**: Show summary and prompt for commit message

## On Failure

- If lint fails after auto-fix: Show remaining errors with file locations
- If typecheck fails: Show type errors with suggested fixes
- If tests fail: Show failing tests with expected vs actual

## Commit Message Format

Use conventional commits: `<type>(<scope>): <description>`

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

Example: `feat(editor): add color picker component`
