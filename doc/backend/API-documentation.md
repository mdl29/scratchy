# API Documentation

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
curl http://localhost:5000/api/room -H "Content-Type: application/json" --data '{"title": "mon title", "description": "ma description"}' | jq
```

Delete Room:
```sh
curl -X DELETE http://localhost:5000/api/room/0
```

Get all rooms:
```sh
curl http://localhost:5000/api/room
```

Get User By id:
```sh
curl http://localhost:5000/api/user/0  | jq
```

Get User By pseudo:
```sh
curl http://localhost:5000/api/user?pseudo=toto  | jq
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