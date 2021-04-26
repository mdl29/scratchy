# Frontend documentation

  - [📂 **front directory**](../../front/)
  
  **How to start it :**

  > run http server in front directory

  ```bash
  python3 -m http.server
  ```
> Open webbrowser at http://localhost:5000



## Frontend sketch :

![frontend-sketch](front.png)

## vuejs components :

- activity-navbar :
  > display description room and if a user wrinting in the input

  ![html](../../logos/html.png) [html file](../front/src/activity_bar.html)

- messages :
  > Display a list of messages

  ![html](../../logos/html.png) [html file](../front/src/messages-list.html)

- room-list :
  > display all joined room

  ![html](../../logos/html.png) [html file](../front/src/room_list.html)

  
   
   --> room-entry :
    > when the user click on the room, he can change it name and description

- room-editor : 
  > when the user click on it, he can create a room
      
  ![html](../../logos/html.png) [html file](../front/src/room_editor.html)

- message-editor :
  > user can type the message in this input and send when he click on sending button 

    ![html](../../logos/html.png) [html file](../front/src/message_editor.html)

- user-list :
   > display users who wrote in the current room

    ![html](../../logos/html.png) [html file](../front/src/user-list.html)