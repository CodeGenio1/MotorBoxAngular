import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io } from "socket.io-client";
import { IChat } from 'src/app/Models/IChat';
import { IGroup } from 'src/app/Models/IGroup';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from '../../../../environments/environment.prod';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, AfterViewInit {
  socket;
  message: string = "";
  userId: string;
  id: string;
  role: string;
  group = {} as IGroup;
  groupNameInitials: string;
  groups: Array<IGroup> = [];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  inputField = document.querySelector(".message_form__input");
  // fallback = document.querySelector(".fallback");
  isTyping: Boolean = false;
  selectedGroupId: any;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService) {
    this.selectedGroupId = this.route.snapshot.params.id;
  }
  setUserId(groupId: string) {
    if (groupId && groupId.length == 0) {
      return;
    }
    let s = groupId.split('-');
    this.userId = s.find(x => x != this.id);
  }
  ngAfterViewInit(): void {
    this.getAllGroups();
  }
  getNameInitials(name: string) {
    if (name && name.length == 0) {
      return "";
    }
    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }
  getAllGroups() {
    try {
      this.chatService.getAllGroups().then((groups: Array<IGroup>) => {
        if (groups.length > 0) {
          this.groups = groups;
          this.moveToTop();
          this.group = groups[0];
          if (this.group) {
            this.groupNameInitials = this.getNameInitials(this.group?.groupName ?? "");
            this.setUserId(this.group.groupId);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  moveToTop(id = ''){
    console.log(this.groups);
    const obj = this.groups.find(x => x.groupId === (id !== '' ? id : this.selectedGroupId));
    const index = this.groups.findIndex(x => x.groupId === (id !== '' ? id : this.selectedGroupId));
    if (index > -1) {
      this.groups.splice(index, 1)
      console.log(this.groups);
      this.groups.splice(0, 0, obj);
      console.log(this.groups);
    }
  }
  getGroupById(id: string) {
    try {
      if(id == this.group.groupId){
        // if group is already active then clicking again should not go for database round.
        return;
      }
      this.chatService.getGroupById(id).then((group: IGroup) => {
        this.group = group;
        if (this.group) {
          //this.moveToTop(group.groupId)
          this.groupNameInitials = this.getNameInitials(this.group?.groupName ?? "");
          this.setUserId(this.group?.groupId ?? "");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit(): void {
    try {
      this.id = this.userService.getUser().user.sub;
      this.role = this.userService.getUser().user.role;
      this.setupSocketConnection();
    } catch (error) {
      console.log(error);
    }
  }
  formatGroupName(members: any ): string {
    return members.find(x=> x._id != this.id)?.fullName;     
  }
  ngOnDestroy() {
    //this.socket.emit('disconnect');
    this.socket.disconnect();
    this.socket = null;
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  onMessageReceived() {
    try {
      this.socket.on('message-broadcast', (data: IChat) => {
        if (data) {
          let g = this.groups.find(x => x.groupId == data.groupId);
          g.messages.push(data);
          this.group = g;
          this.moveToTop(data.groupId);
          // const element = document.createElement('div');
          // const header = document.createElement('div');
          // const content = document.createElement('div');

          // header.className = "name-box";
          // header.innerHTML = `<p>${data.senderName == undefined ? "NA" : "data.senderName"}</p>`;
          // content.className = "text-box";
          // content.innerHTML = `<p> ${data.message} </p> <p class="time-para">${this.fromNow(data.sendingDateTime)}</p>`;

          // element.appendChild(header);
          // element.appendChild(content);
          // element.className = "chat-row";
          // document.getElementById('message-list').appendChild(element);
          // this.scrollToBottom();
        }
      });
    } catch (error) {
      console.log(error);
    }

  }
  onTypingNotificationReceived() {
    try {
      this.socket.on("typingReceived", function (data: any) {
        const { isTyping, senderId, groupId } = data;

        if (!isTyping) {
          this.fallback.innerHTML = "";
          return;
        }
        let g = this.groups.filter(x => x.groupId == groupId)[0];
        g.isTyping = isTyping;
        
        this.fallback.innerHTML = `<p>${senderId} is typing...</p>`;
      });
    } catch (error) {
      console.log(error);
    }

  }
  onTypingNotification() {
    try {
      if (this.message.length == 0) {
        return;
      }

      this.socket.emit("typing", {
        isTyping: this.message.length > 0,
        senderId: this.id,
        receiverId: this.userId,
        groupId: this.group.groupId
      });
    } catch (error) {
      console.log(error);
    }

  }
  setupSocketConnection() {
    this.socket = io(environment.socketServerUrl, { upgrade: true });

    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(`connection established: ${this.socket.connected}`); // true
    });
    const tryReconnect = () => {
      setTimeout(() => {
        this.socket.io.open((err) => {
          if (err) {
            tryReconnect();
          }
        });
      }, 2000);
    }

    this.socket.io.on("close", tryReconnect);



    this.socket.emit('connectionInfo', this.id);
    this.onMessageReceived();
    // this.onTypingNotification();
    // this.onTypingNotificationReceived();
  }

  onMessageSend(obj: IChat) {
    try {
      if (this.message.length == 0) {
        return;
      }
      this.socket.emit('message', obj);
      this.group.messages.push(obj);
  //     const element = document.createElement('div');
  //     element.innerHTML = `<div class="chat-row">
  //   <div class="msg-right">
  //     <p>
  //       ${this.message}
  //     </p>
  //     <p class="time-para">${this.fromNow(new Date())}</p>
  //   </div>
  // </div>`;
  //     document.getElementById('message-list').appendChild(element);
    } catch (error) {
      console.log(error);
    }

  }
  sendMessage() {
    try {
      if (this.message.length == 0) {
        return;
      }
      let msg = {} as IChat;
      msg.senderId = this.id;
      msg.receiverId = this.userId;
      msg.message = this.message;
      msg.sendingDateTime = new Date();
      msg.timestamp = + new Date();
      msg.isRead = false;
      msg.groupId = this.group.groupId;
      this.moveToTop(this.group.groupId);
      this.chatService.saveMessage(msg).then(c => {
        this.onMessageSend(msg);
        this.message = '';
      });
    } catch (error) {
      console.log(error);
    }

  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  /**
   * Human readable elapsed or remaining time (example: 3 minutes ago)
   * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
   * @return {string} Human readable elapsed or remaining time
   * @author github.com/victornpb
   */
  fromNow(date) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const units = [
      { max: 30 * SECOND, divisor: 1, past1: 'just now', pastN: 'just now', future1: 'just now', futureN: 'just now' },
      { max: MINUTE, divisor: SECOND, past1: 'a second ago', pastN: '# seconds ago', future1: 'in a second', futureN: 'in # seconds' },
      { max: HOUR, divisor: MINUTE, past1: 'a minute ago', pastN: '# minutes ago', future1: 'in a minute', futureN: 'in # minutes' },
      { max: DAY, divisor: HOUR, past1: 'an hour ago', pastN: '# hours ago', future1: 'in an hour', futureN: 'in # hours' },
      { max: WEEK, divisor: DAY, past1: 'yesterday', pastN: '# days ago', future1: 'tomorrow', futureN: 'in # days' },
      { max: 4 * WEEK, divisor: WEEK, past1: 'last week', pastN: '# weeks ago', future1: 'in a week', futureN: 'in # weeks' },
      { max: YEAR, divisor: MONTH, past1: 'last month', pastN: '# months ago', future1: 'in a month', futureN: 'in # months' },
      { max: 100 * YEAR, divisor: YEAR, past1: 'last year', pastN: '# years ago', future1: 'in a year', futureN: 'in # years' },
      { max: 1000 * YEAR, divisor: 100 * YEAR, past1: 'last century', pastN: '# centuries ago', future1: 'in a century', futureN: 'in # centuries' },
      { max: Infinity, divisor: 1000 * YEAR, past1: 'last millennium', pastN: '# millennia ago', future1: 'in a millennium', futureN: 'in # millennia' },
    ];
    const diff = Date.now() - (typeof date === 'object' ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const unit of units) {
      if (diffAbs < unit.max) {
        const isFuture = diff < 0;
        const x = Math.round(Math.abs(diff) / unit.divisor);
        if (x <= 1) return isFuture ? unit.future1 : unit.past1;
        return (isFuture ? unit.futureN : unit.pastN).replace('#', x.toString());
      }
    }
  }
}
