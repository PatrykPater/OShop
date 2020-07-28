import { Injectable } from '@angular/core';
import { FlashMessage } from '../models/flash-message';
import { FlashMessageType } from '../enums/flash-message-types';
import { Observable, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class FlashMessageService {
  flashmessage: FlashMessage;
  flashmessageSubscription: Subscription;
  constructor() { }

  showMessage(text: string, messageType: FlashMessageType) : void{
    this.flashmessage = { text: text, type: messageType };
  }

  getMessage(): Observable<FlashMessage>{
    debugger;
    return this.flashmessageSubscription = Observable.create(observer =>{
      observer.next(this.flashmessage);
    });
  }
}
