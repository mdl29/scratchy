#sratchy server

#how to run 

'''bash
export FLASK_APP=app.py
flask run 
'''
#how to play 

Get Room:
```
curl http://localhost:5000/api/room/0  | jq
```

Create Room:
```
curl http://localhost:5000/api/room -H "Content-Type: application/json" --data '{"title": "mon title", "description": "ma description"}'
```

Delete Room:
```
curl -X DELETE http://localhost:5000/api/room/0 
```