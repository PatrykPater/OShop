import { FlashMessageType } from '../enums/flash-message-types';

export class FlashMessage {
    constructor(text: string, type: FlashMessageType)
    {
        this.text = text;
        this.type = type;
    }
    
    text: string;
    type: FlashMessageType;
}