import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Chat } from 'src/app/model/chat';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any[]
  user: any
  message: Message
  chat: Chat
  socketMessages: any[] = []
  socketChat: any
  msg: string
  fechas: Date[] = []
  constructor(private messageService: MessageService,
    private chatService: ChatService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private theWebSocketService: WebSocketService,
    private theUserService: UserService,
    private theSecurityService: SecurityService,
  ) {
    {
      this.user = {
        _id: "",
        name: "",
        email: "",
        password: ""
      },
        this.message = {
          id: 0,
          chat_id: 0,
          content_message: "",
          user_id: ""
        },
        this.chat = {
          id: 0,
          name: "",
        }
    }
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.params.id) {
      this.message.chat_id = this.activateRoute.snapshot.params.id
      this.user = JSON.parse(this.theSecurityService.getSessionData())
      this.message.user_id = this.user._id
      this.getChat(this.message.chat_id)
      this.listByChat(this.activateRoute.snapshot.params.id)
    }
    this.theWebSocketService.setNameEvent(`chat${this.message.chat_id}`)
    this.theWebSocketService.callback.subscribe(data => {
      console.log("llegando desde el backend mensaje" + JSON.stringify(data))
      this.msg = data
      this.socketMessages.push(this.msg)
    })

  }

  listByChat(id: number) {
    this.messageService.listByChat(id).subscribe(data => {
      this.messages = data
    })
  }

  getChat(id: number) {
    this.chatService.view(id).subscribe(data => {
      this.chat.id = data.id
      this.chat.name = data.name
    })
  }

  create() {
    console.log(this.message);
    this.msg = this.message.content_message
    this.theWebSocketService.emit(`${this.message.chat_id}`, `${this.message.content_message}`)
    this.messageService.create(this.message).subscribe()
    this.msg = ""
  }

}
