import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IChat } from '../Models/IChat';
import { IGroup } from '../Models/IGroup';
//import { IPostRequirement } from '../Models/IPostRequirement';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  createGroup(group: IGroup){
    return this.http.post(`${environment.baseUrl}chat/group`,group).toPromise();
  }
  getAllGroups() {
    return this.http.get(`${environment.baseUrl}chat/group`).toPromise();
  }
  getGroupById(id: string) {
    return this.http.get(`${environment.baseUrl}chat/group/${id}`).toPromise();
  }
  saveMessage(chat: IChat){
    return this.http.post(`${environment.baseUrl}chat`,chat).toPromise();

  }

}
