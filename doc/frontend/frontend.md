# Frontend documentation

  - [📂 **front directory**](../../front/)
  
## How to start it :

  > go in front/src directory

  ```bash
  cd front/src
  ```

  > launch python server

  ```bash
  python3 -m http.server
  ```
  > Open webbrowser at http://localhost:8000



## Frontend sketch :

![frontend-sketch](front.png)

## vuejs components :

- activity-navbar :
  > display description room and if a user wrinting in the input

  ![html emoji](https://yannis-mlgrn.github.io/codmoji/src/emoji/html.png) [html file](../../front/activity_bar.html)

- messages :
  > Display a list of messages

  ![html emoji](https://yannis-mlgrn.github.io/codmoji/src/emoji/html.png) [html file](../../front/messages-list.html)

- room-list :
  > display all joined room

  ![html emoji](https://yannis-mlgrn.github.io/codmoji/src/emoji/html.png) [html file](../../front/room_list.html)

  
   
   --> room-entry :
    > when the user click on the room, he can change it name and description

- room-editor : 
  > when the user click on it, he can create a room
      
  ![html emoji](https://yannis-mlgrn.github.io/codmoji/src/emoji/html.png) [html file](../../front/room_editor.html)

- message-editor :
  > user can type the message in this input and send when he click on sending button 

    ![html emoji](https://yannis-mlgrn.github.io/codmoji/src/emoji/html.png) [html file](../../front/message_editor.html)

- user-list :
   > display users who wrote in the current room

    ![html emoji](https://yannis-mlgrn.github.io/codmoji/src/emoji/html.png) [html file](../../front/user-list.html)