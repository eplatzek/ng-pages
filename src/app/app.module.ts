import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ChatGptService } from './services/chat-gpt.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppComponent,
        ChatGptService,
    ],
})
export class AppModule { }