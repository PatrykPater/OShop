import { HostBinding, Directive, Input } from '@angular/core';
import { FlashMessageType } from '../enums/flash-message-types';

@Directive({
    selector: '[flashMessageTypeStyle]'
})
export class FlashMessageTypeDirective {
    @HostBinding('class')
        get elementClass(): string {
            return this.getMsgTypeStyles()
    }

    @Input('MsgTypeStyle') MsgTypeStyle: FlashMessageType;

    getMsgTypeStyles(): string{
        let msgStyleResult: string = '';

        switch(this.MsgTypeStyle) { 
            case FlashMessageType.success: { 
                msgStyleResult = 'alert alert-success flash-message';
               break; 
            } 
            case FlashMessageType.danger: { 
                msgStyleResult = 'alert alert-danger flash-message';
               break; 
            }
            case FlashMessageType.info: { 
                msgStyleResult = 'alert alert-info flash-message';
                break; 
             }
             case FlashMessageType.warning: { 
                msgStyleResult = 'alert alert-warning flash-message';
                break; 
             }   
            default: { 
                msgStyleResult = 'flash-msg-hidden flash-message';
               break; 
            } 
         } 

        return msgStyleResult;
    }
}