// chat.component.ts
import { Component } from '@angular/core';
import { ChatGptService } from '../services/chat-gpt.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [FormsModule],
  // styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public chatInput = '';
  public chatOutput = '';

  constructor(private chatGptService: ChatGptService) { }

  public sendToGpt3(): void {
    this.chatGptService.chatWithGpt3(this.chatInput).subscribe(response => {
      this.chatOutput = response.choices[0].text;
    });
  }
}