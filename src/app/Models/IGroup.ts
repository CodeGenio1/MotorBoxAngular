import { IChat } from "./IChat";

export interface IGroup {
    id: string;
    groupId: string;
    messages: Array<IChat>;
    createdDate: Date;
    updatedDate: Date;
    groupName: string;
    createdBy: string;
    updatedBy: string;
    isTyping: Boolean;
}
