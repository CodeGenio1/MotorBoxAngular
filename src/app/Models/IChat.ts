export interface IChat {
    id: string;
    message: string;
    senderName:string;
    receiverName:string;
    sendingDateTime: Date;
    timestamp: Number;
    senderId: string;
    receiverId: string;
    isRead: boolean;
    groupId:string;
}
