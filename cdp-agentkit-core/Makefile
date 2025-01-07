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

.PHONY: local-docs
local-docs: docs
	cd docs && make html && open ./_build/html/index.html

.PHONY: test
test:
	pytest

.PHONY: publish
publish:
	poetry publish --build

.PHONY: publish-docs
publish-docs:
	ghp-import -n -p -f docs/_build/html
