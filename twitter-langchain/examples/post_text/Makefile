ifneq (,$(wildcard ./.env-local))
	include .env-local
endif

export

.PHONY: run
run:
	poetry install --with dev
	poetry run python post_text.py
