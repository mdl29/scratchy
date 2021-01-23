# sratchy server

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
Get User:
```sh
curl http://localhost:5000/api/user/0  | jq
```

Create User:
```sh
curl http://localhost:5000/api/user -H "Content-Type: application/json" --data '{"pseudo": "mon pseudo", "profile image": "mon image de profile"}'
```

Delete User:
```sh
curl -X DELETE http://localhost:5000/api/user/0 
```
