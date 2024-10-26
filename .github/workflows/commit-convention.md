# Commit Message Convention

This repository follows [Conventional Commits](https://www.conventionalcommits.org/):

## Format
`<type>(<scope>): <subject>`

## Types
* feat: A new feature
* fix: A bug fix
* docs: Documentation only changes
* style: Changes that do not affect the meaning of the code
* refactor: A code change that neither fixes a bug nor adds a feature
* perf: A code change that improves performance
* test: Adding missing tests or correcting existing tests
* build: Changes that affect the build system or external dependencies
* ci: Changes to our CI configuration files and scripts
* chore: Other changes that don't modify src or test files
* revert: Reverts a previous commit

# Example:
Use conventional commits format:
```txt
feat(scope): add new feature
fix(scope): fix some bug
docs(scope): update documentation
```
CLI commands:
```bash
bashCopygit commit -m "feat(button): add new variant for primary button"
git commit -m "fix(modal): resolve overlay click issue"
git commit -m "docs(readme): update installation instructions"
```

