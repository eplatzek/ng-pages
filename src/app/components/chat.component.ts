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

  selectedResponse = '';
  responses: string[] = [];
  currentResponseIndex = -1;

  private apiKey: string | null = '';

  // Default values for sliders
  public formality: number = 3;
  public conciseness: number = 2;
  public warmth: number = 2;

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
      this.chatGptService.chatWithGpt3WModifications(this.chatInput, this.apiKey, this.getModifications()).subscribe(response => {
        this.responses.push(response.choices[0].message.content);
        this.currentResponseIndex = this.responses.length - 1;
        this.updateSelectedResponse()
      });
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

  // Function to get modifications
  getModifications(): object {
    return {
      formality: this.getFormality(this.formality),
      conciseness: this.getConciseness(this.conciseness),
      warmth: this.getWarmth(this.warmth),
    };
  }

  // Function to get formality level
  getFormality(level: number): string {
    switch(level) {
      case 1: return 'Casual';
      case 2: return 'SemiCasual';
      case 3: return 'Unchanged';
      case 4: return 'SemiProfessional';
      case 5: return 'Professional';
      default: return 'Unchanged';
    }
  }

  // Function to get conciseness level
  getConciseness(level: number): string {
    switch(level) {
      case 1: return 'Concise';
      case 2: return 'Unchanged';
      case 3: return 'Verbose';
      default: return 'Unchanged';
    }
  }

  // Function to get warmth level
  getWarmth(level: number): string {
    switch(level) {
      case 1: return 'Cooler';
      case 2: return 'Unchanged';
      case 3: return 'Warmer';
      default: return 'Unchanged';
    }
  }

  public nextResponse(): void {
    if (this.currentResponseIndex < this.responses.length - 1) {
      this.currentResponseIndex++;
      this.updateSelectedResponse();
    }
  }

  public previousResponse(): void {
    if (this.currentResponseIndex > 0) {
      this.currentResponseIndex--;
      this.updateSelectedResponse();
    }
  }

  public updateSelectedResponse(): void {
    this.selectedResponse = this.responses[this.currentResponseIndex];
  }
}