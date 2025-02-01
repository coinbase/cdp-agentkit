ifneq (,$(wildcard ./.env))
	include .env
	export
endif

.PHONY: format
format:
	poetry run ruff format .

.PHONY: lint
lint:
	poetry run ruff check .

.PHONY: lint-fix
lint-fix:
	poetry run ruff check . --fix

.PHONY: docs
docs:
	poetry run sphinx-apidoc -f -o ./docs ./cdp_agentkit_core

.PHONY: local-docs
local-docs: docs
	cd docs && make html && open ./_build/html/index.html

.PHONY: test
test:
	poetry run pytest

.PHONY: test-utils
test-utils:
	poetry run pytest tests/actions/aerodrome/test_utils_e2e.py -s

.PHONY: test-deposit
test-deposit:
	poetry run pytest tests/actions/aerodrome/test_deposit_e2e.py -s

.PHONY: test-quote
test-quote:
	poetry run pytest tests/actions/aerodrome/test_quote_e2e.py -s

.PHONY: test-withdraw
test-withdraw:
	poetry run pytest tests/actions/aerodrome/test_withdraw_e2e.py -s
