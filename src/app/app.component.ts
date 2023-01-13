import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';

export interface Message {
  sender: string;
  mess: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OxyChat';
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  message!: string;
  converstation: Message[] = [];
  loading: boolean = false;
  number = 0;

  constructor(private service: AppService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  send() {
    this.converstation?.push({ sender: 'user', mess: this.message });
    this.loading = true;
    this.service.requestApi(this.message).subscribe((res) => {
      this.loading = false;
      this.converstation?.push({ sender: 'bot', mess: res });
    });
    this.number++;
    this.message = '';
  }
  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
