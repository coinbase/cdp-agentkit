ifneq (,$(wildcard ./.env))
	include .env
endif

export

.PHONY: install
install:
	poetry install --with dev

.PHONY: run
run:
	poetry run python chatbot.py
