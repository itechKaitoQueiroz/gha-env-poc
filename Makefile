SITE = opengine-monorepo
SERVICE = app
COMPOSE_SERVICE = docker compose -p ${SITE}
# ADDITIONAL_ARGS = $(if $(BRAND), "--filter=$(BRAND)")
ADDITIONAL_ARGS := $(if ${BRAND},--filter=${BRAND})

echo:
	@echo ${ADDITIONAL_ARGS}

up:
	${COMPOSE_SERVICE} -f compose.yaml up --build -d

down:
	${COMPOSE_SERVICE} down

exec:
	${COMPOSE_SERVICE} exec ${SERVICE} /bin/sh

start:
	make up
	make install
	make dev

# ------------ #
#     Nuxt     #
# ------------ #
install:
	${COMPOSE_SERVICE} exec ${SERVICE} pnpm install

dev:
	${COMPOSE_SERVICE} exec ${SERVICE} pnpm ${ADDITIONAL_ARGS} dev

build:
	${COMPOSE_SERVICE} exec ${SERVICE} pnpm ${ADDITIONAL_ARGS} build
