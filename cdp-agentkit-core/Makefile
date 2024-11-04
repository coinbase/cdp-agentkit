.PHONY: format
format:
	ruff format .

.PHONY: lint
lint:
	ruff check .

.PHONY: lint-fix
lint-fix:
	ruff check . --fix

.PHONY: docs
docs:
	sphinx-apidoc -f -o ./docs ./cdp_agentkit_core

.PHONY: test
test:
	pytest
