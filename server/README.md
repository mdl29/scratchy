# sratchy server

## Architecture Overview

Scratchy is composed of:
* front: VueJS
* server: scratchy_server in Python
* database: mongodb in docker

## Start Scratchy Stack

Start mongodb:
* prerequisites:
  * install docker: see [Install Docker Engine](https://docs.docker.com/engine/install/)
  * install docker-compose: see [Install Docker-compose](https://docs.docker.com/compose/install/) or use the package management of your GNU/Linux distribution (Ubuntu for example)
* go to docker directory
```sh
<scratchy root>$ cd docker
```
* start mongodb using docker-compose:
```sh
<scratchy/docker>$ docker-compose up -d
```

---
**NOTE**

For stopping mongodb, use:
```sh
<scratchy/docker>$ docker-compose down
```
---

Then read the next section for server part.

## how to run package version

Install the depedencies :
```sh
pip install -r requirements.txt
```

Install the package in developpment :
```sh
python setup.py develop
```

Start the serveur :
```sh
scratchy-server
```

##how to delete the data base

* Go to docker directory:
```sh
<scratchy root>$ cd docker
```

* Stop mongodb using docker-compose:
```sh
<scratchy/docker>$ docker-compose down
```

* Remove data file:
```sh
<scratchy/docker>$ sudo rm -r data
```

* Restore git file:
```sh
<scratchy/docker>$ git restore data/.gitignore
```

* Restart mongodb using docker-compose:
```sh
<scratchy/docker>$ docker-compose up -d
```