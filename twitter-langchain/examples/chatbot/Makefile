ifneq (,$(wildcard ./.env-local))
	include .env-local
endif

export

.PHONY: run
run:
	poetry install && \
	poetry run python chatbot.py
