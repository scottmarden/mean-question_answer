import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '.././user.service';
import { QuestionService } from '.././question.service';
import { AnswerService } from '.././answer.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

	question_id = null
	question: any = {}

	answers: Array<any> = []


	constructor(
		private _questionService: QuestionService,
		private _answerService: AnswerService,
		private _router: Router,
		private _route: ActivatedRoute

	) {
		this._route.params.subscribe((param)=>{
			this.question_id = param.question_id
		})
	}

	ngOnInit() {
		if(!localStorage.user_email){
			this._router.navigate(['/'])
		}
		this.getAnswers(this.question_id)
	}

	getAnswers(question_id){
		this._answerService.serviceGetAnswers(question_id)
			.then( foundQuestion => {
				this.question = foundQuestion
				this.answers = foundQuestion.answers
			})
			.catch( err => {
				console.log(err)
			})
	}

	likeAnswer(answer_id){
		this._answerService.serviceLikeAnswer(answer_id)
			.then( response => {
				this.getAnswers(this.question_id)
			})
			.catch( err => {
				console.log(err)
			})
	}

}
