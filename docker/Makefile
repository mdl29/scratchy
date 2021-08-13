DOCKERFILES=docker-compose.yml
DOCKERFILES_DEV=docker-compose-dev.yml
DOCKERFILES_TEST=docker-compose-test.yml

start-prod:
	docker-compose -f ${DOCKERFILES} up -d

start-dev:
	docker-compose -f ${DOCKERFILES} -f ${DOCKERFILES_DEV} up -d

start-test: 
	docker-compose -f ${DOCKERFILES} -f ${DOCKERFILES_TEST} up -d

stop:
	docker-compose -f ${DOCKERFILES} -f ${DOCKERFILES_DEV} -f ${DOCKERFILES_TEST} stop

clean:
	docker-compose -f ${DOCKERFILES} -f ${DOCKERFILES_DEV} -f ${DOCKERFILES_TEST} rm -f

clean-data:
	rm -r data
