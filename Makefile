.PHONY: docs
docs:
	@ scripts/docs.sh

.PHONY: local-docs
local-docs: docs
	cd docs && make html && open ./_build/html/index.html
