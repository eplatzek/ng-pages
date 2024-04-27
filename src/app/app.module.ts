import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent }  from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
})
export class AppModule { }