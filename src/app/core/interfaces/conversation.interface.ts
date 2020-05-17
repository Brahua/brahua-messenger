export interface IConversation {
  id?: string;
  timestamp?: number;
  text?: string;
  sender?: string;
  receiver?: string;
  viewed?: boolean;
  type?: string;
}
