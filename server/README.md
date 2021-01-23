# sratchy server

## how to run 

add app :
```sh
export FLASK_APP=app.py
```
run :
```sh
flask run 
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