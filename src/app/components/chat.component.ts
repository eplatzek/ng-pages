// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatGptService } from '../services/chat-gpt.service';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule,
    MatSliderModule  ],
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {
  public chatInput = '';
  public chatOutput = '';
  private apiKey: string | null = '';

  // Default values for sliders
  public formality = 3;

  constructor(private chatGptService: ChatGptService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiKey = localStorage.getItem('apiKey');
    if (this.apiKey) {
      this.openSnackBar('API key loaded');
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
        this.chatOutput = response.choices[0].message.content;
      });

      console.log(this.chatOutput);
    } else {
      this.openSnackBar('No API key provided');
    }
  }

  public replaceKey(): void {
    const newKey = prompt('Please enter your new API key');
    if (newKey) {
      this.apiKey = newKey;
      localStorage.setItem('apiKey', newKey);
      this.openSnackBar('API key replaced');
    }
  }

  public deleteKey(): void {
    this.apiKey = null;
    localStorage.removeItem('apiKey');
    this.openSnackBar('API key deleted');
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 1000,
    });
  }

  // Function to get formality level
  getFormality(level: number): string {
    switch(level) {
      case 1: return 'Casual';
      case 2: return 'SemiCasual';
      case 3: return 'Neutral';
      case 4: return 'SemiProfessional';
      case 5: return 'Professional';
      default: return 'Neutral';
    }
  }
}