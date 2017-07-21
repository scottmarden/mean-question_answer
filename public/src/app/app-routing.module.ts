import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { HomeComponent } from './home/home.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { NewAnswerComponent } from './new-answer/new-answer.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: LoginRegComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'new_question', component: NewQuestionComponent },
	{ path: 'question/:question_id', component: QuestionDetailComponent },
	{ path: 'answer/:question_id', component: NewAnswerComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
