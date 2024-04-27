// chat-gpt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatResponse } from '../classes/chat-response';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  public chatWithGpt3(prompt: string, apiKey: string): Observable<ChatResponse> {
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

    return this.http.post<any>(this.apiUrl, data, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
  }

  public chatWithGpt3WModifications(prompt: string, apiKey: string, modifications:object): Observable<ChatResponse> {
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: this.promptModificationsToString(prompt, modifications),            
          }
        ],
        temperature: 0.7
      };

    console.log(data);

    return this.http.post<any>(this.apiUrl, data, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
  }

  private promptModificationsToString(prompt: string, modifications:object): string {
   return  JSON.stringify({
      instructions: 'You are text reviser. The prompt will contain a text that needs to be revised. Your task is to revise the text to make it meet the required modifications. Also correct spelling errors',
      prompt: prompt,
      modifications: JSON.stringify(modifications)})
  }
}