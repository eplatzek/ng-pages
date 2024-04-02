// chat-response.ts
export class ChatResponse {
    id: string = '';
    object: string = '';
    created: number = 0;
    model: string = '';
    choices: Choice[] = [];
    usage: Usage = new Usage();
    system_fingerprint: string = '';
  }
  
  export class Choice {
    index: number = 0;
    message: Message = new Message();
    finish_reason: string = '';
  }
  
  export class Message {
    role: string = '';
    content: string = '';
  }
  
  export class Usage {
    prompt_tokens: number = 0;
    completion_tokens: number = 0;
    total_tokens: number = 0;
  }