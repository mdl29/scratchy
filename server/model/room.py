class RoomModel :
    description = ""
    id = ""
    title = ""
    user = []

    def __init__(self):
        pass 
class MessageModel:
    id = ""
    content = ""
    author = ""
    timestamp = int()
    roomId= ""
    user = []
    def __init__(self):
        pass 
class UserModel:
    id = ""
    pseudo = ""
    profileImage = ""
    roomsId = []
    def __init__(self):
        pass 

