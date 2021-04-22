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


## how to play

Requirements:
* curl
* jq

On ubuntu/debian, simply run : `sudo apt install curl jq`

Get Room:
```sh
curl http://localhost:5000/api/room/0  | jq
```

Create Room:
```sh
curl http://localhost:5000/api/room -H "Content-Type: application/json" --data '{"title": "mon title", "description": "ma description"}'
```

Delete Room:
```sh
curl -X DELETE http://localhost:5000/api/room/0
```

Get all rooms:
```sh
curl http://localhost:5000/api/room
```

Get User:
```sh
curl http://localhost:5000/api/user/0  | jq
```

Create User:
```sh
curl http://localhost:5000/api/user -H "Content-Type: application/json" --data '{"pseudo": "mon pseudo", "profileImage": "https://http.cat/204"}'
```

Delete User:
```sh
curl -X DELETE http://localhost:5000/api/user/0
```

Get Message:
```sh
curl http://localhost:5000/api/message/0  | jq
```

Create Message:
```sh
curl http://localhost:5000/api/message -H "Content-Type: application/json" --data '{"author": "the author id", "content": "write what you want its your message","roomId": "the ids of the rooms you are in"}'
```

Delete Message:
```sh
curl -X DELETE http://localhost:5000/api/message/0
```

Get all messages for one RoomId:
```sh
curl -v http:/localhost:5000/api/message?roomid=6043978fd68dc3fcbf6079d6
```
