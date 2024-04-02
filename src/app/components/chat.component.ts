// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatGptService } from '../services/chat-gpt.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {
  public chatInput = '';
  public chatOutput = '';
  private apiKey: string | null = '';

  constructor(private chatGptService: ChatGptService) { }

  ngOnInit(): void {
    this.apiKey = localStorage.getItem('apiKey');
    if (this.apiKey) {
      alert('API key loaded');
    } else {
      this.apiKey = prompt('Please enter your API key');
      if (this.apiKey) {
        localStorage.setItem('apiKey', this.apiKey);
      }
    }
  }

  public sendToGpt3(): void {
    if (this.apiKey) {
      this.chatGptService.chatWithGpt3(this.chatInput, this.apiKey).subscribe(response => {
        this.chatOutput = response.choices[0].text;
      });
    } else {
      alert('No API key provided');
    }
  }

  public replaceKey(): void {
    const newKey = prompt('Please enter your new API key');
    if (newKey) {
      this.apiKey = newKey;
      localStorage.setItem('apiKey', newKey);
      alert('API key replaced');
    }
  }

  public deleteKey(): void {
    this.apiKey = null;
    localStorage.removeItem('apiKey');
    alert('API key deleted');
  }
}