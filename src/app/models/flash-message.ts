import { FlashMessageType } from '../enums/flash-message-types';

export interface FlashMessage {
    text: string,
    type: FlashMessageType
}