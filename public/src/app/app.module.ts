import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { UserService } from './user.service';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';

import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { HomeComponent } from './home/home.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { NewAnswerComponent } from './new-answer/new-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    HomeComponent,
    NewQuestionComponent,
    QuestionDetailComponent,
    NewAnswerComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	RouterModule,
	HttpModule,
  ],
  providers: [UserService, QuestionService, AnswerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
