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

***ROOM***

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
***MESSAGE***

GET message:
```sh
curl http://localhost:5000/api/message/0  | jq
```
Delete message 
```sh
curl -X DELETE http://localhost:5000/api/message/0 
```
Create a message 
```sh
curl http://localhost:5000/api/message -H "Content-Type: application/json" --data '{"content": "hello world", "author": "yannis","roomId":"0","timestamp":1200}'
{
```
***USER***

GET user
```sh
curl http://localhost:5000/api/user/0  | jq
```
Delete message 
```sh
curl -X DELETE http://localhost:5000/api/user/0  
```
Create user 
```sh
curl http://localhost:5000/api/message -H "Content-Type: application/json" --data '{"content": "hello world", "author": "yannis","roomId":"0","timestamp":1200}'
```
Delete user
```sh
curl -X DELETE http://localhost:5000/api/user/0 
```