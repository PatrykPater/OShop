import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessageService } from '../services/flash-message.service';
import { FlashMessage } from '../models/flash-message';
import { Subscription } from 'rxjs';
import { FlashMessageType } from '../enums/flash-message-types';

@Component({
  selector: 'flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit, OnDestroy {
  flashMessage: FlashMessage = { text: "", type: FlashMessageType.none };
  flashMessageSubscription: Subscription;

  constructor(private flashMessageService: FlashMessageService) { }

  ngOnInit(): void {
    this.flashMessageSubscription = this.flashMessageService
                                          .flashMessageEmiter.pipe()
                                           .subscribe(msg => {
                                                        this.flashMessage = msg;
                                                        this.initCloseFlashMsg();
                                                      });
  }

  ngOnDestroy(): void {
    this.flashMessageSubscription.unsubscribe();
  }

  private initCloseFlashMsg(): void{
    setTimeout(() => {
      this.flashMessage.type = FlashMessageType.none;
    }, 3000);
  }

}
