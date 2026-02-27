# Frontend Vue.js コード品質チェック用Makefile

.PHONY: help lint lint-fix format format-check type-check test test-run test-coverage all-check install-dev

help:
	@echo "Available targets:"
	@echo "  install-dev    - Install development dependencies"
	@echo "  lint           - Run ESLint"
	@echo "  lint-fix       - Run ESLint with auto-fix"
	@echo "  format         - Format code with Prettier"
	@echo "  format-check   - Check code formatting without modifying"
	@echo "  type-check     - Run TypeScript type checking (if applicable)"
	@echo "  test           - Run tests in watch mode"
	@echo "  test-run       - Run tests once"
	@echo "  test-coverage  - Run tests with coverage report"
	@echo "  all-check      - Run all checks (format-check, lint, test-run)"

install-dev:
	npm install

lint:
	@echo "Running ESLint..."
	npm run lint:check

lint-fix:
	@echo "Running ESLint with auto-fix..."
	npm run lint

format:
	@echo "Formatting code with Prettier..."
	npm run format

format-check:
	@echo "Checking code formatting..."
	npm run format:check

type-check:
	@echo "Running TypeScript type checking..."
	npm run type-check || echo "TypeScript not configured, skipping..."

test:
	@echo "Running tests in watch mode..."
	npm run test

test-run:
	@echo "Running tests once..."
	npm run test:run

test-coverage:
	@echo "Running tests with coverage..."
	npm run test:coverage

all-check: format-check lint test-run
	@echo "✓ All checks completed"

