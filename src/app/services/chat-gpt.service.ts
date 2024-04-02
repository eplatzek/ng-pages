// chat-gpt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  public chatWithGpt3(prompt: string, apiKey: string): Observable<any> {
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      };

    return this.http.post(this.apiUrl, data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }
}