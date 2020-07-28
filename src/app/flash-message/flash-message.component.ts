import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessageService } from '../services/flash-message.service';
import { FlashMessage } from '../models/flash-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit, OnDestroy {
  flashMessage: FlashMessage;
  flashMessageSubscription: Subscription;

  constructor(private flashMessageService: FlashMessageService) { }

  ngOnInit(): void {
    this.flashMessageSubscription = this.flashMessageService.getMessage()
                                                            .subscribe(msg => {
                                                              debugger;
                                                              this.flashMessage = msg;
                                                            });
  }

  ngOnDestroy(): void {
    this.flashMessageSubscription.unsubscribe();
  }

}
