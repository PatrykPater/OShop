import { Injectable } from '@angular/core';
import { FlashMessage } from '../models/flash-message';
import { FlashMessageType } from '../enums/flash-message-types';
import { Observable, Subscription, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class FlashMessageService {
  flashMessageEmiter = new Subject<FlashMessage>();
  
  constructor() { }

  createFlashMessage(msgText: string, msgType: FlashMessageType) : FlashMessage{
    return new FlashMessage(msgText, msgType);
  }
  
}
