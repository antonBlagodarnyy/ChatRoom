interface BaseMessageDto {
  type: 'CONNECTED_USERS' | 'RECEIVED' | 'SENT' | 'CONNECTION';
}
export interface MessageConnectedUsersDto extends BaseMessageDto {
  type: 'CONNECTED_USERS';
  connectedUsers: number;
}
export interface MessageSentDto extends BaseMessageDto {
  type: 'SENT';
  sender: string;
  text: string;
}
export interface MessageReceivedDto extends BaseMessageDto {
  type: 'RECEIVED';
  sender: string;
  text: string;
  ts: string;
}
export interface MessageConnectionDto extends BaseMessageDto {
  type: 'CONNECTION';
  username: string;
}
export type MessageDto =
  | MessageReceivedDto
  | MessageConnectedUsersDto
  | MessageSentDto
  | MessageConnectionDto;
