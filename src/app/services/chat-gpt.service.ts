// chat-gpt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatGptService {
  private readonly apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  private readonly apiKey = 'YOUR_OPENAI_KEY'

  constructor(private http: HttpClient) { }

  public chatWithGpt3(prompt: string): Observable<any> {
    const data = {
      prompt: prompt,
      max_tokens: 60
    };

    return this.http.post(this.apiUrl, data, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }
}