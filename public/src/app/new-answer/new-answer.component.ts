import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '.././user.service';
import { QuestionService } from '.././question.service';
import { AnswerService } from '.././answer.service';

@Component({
	selector: 'app-new-answer',
	templateUrl: './new-answer.component.html',
	styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {

	question: string = ""
	q_id: null

	newAnswer: any = {
		answer: null,
		details: null,
		email: localStorage.getItem("user_email"),
		question_id: null
	}

	constructor(
		private _questionService: QuestionService,
		private _answerService: AnswerService,
		private _router: Router,
		private _route: ActivatedRoute

	) {
		this._route.params.subscribe((param)=>{
			console.log("Question ID: ", param.question_id)
			this.newAnswer.question_id = param.question_id;
			this.q_id = param.question_id
		})
	}

	ngOnInit() {
		if(!localStorage.user_email){
			this._router.navigate(['/'])
		}
		this.getQuestion()
	}

	getQuestion(){
		this._questionService.serviceOneQuestion(this.newAnswer.question_id)
			.then( foundQuestion => {
				console.log("Found question: ", foundQuestion)
				this.question = foundQuestion.question
			})
			.catch( err => {
				console.log(err)
			})
	}

	createAnswer(){
		this._answerService.serviceCreateAnswer(this.newAnswer)
			.then( response => {
				this._router.navigate(['/home'])
			})
			.catch( err => {
				console.log(err)
			})
	}

	logout(){
		localStorage.clear()
		this._router.navigate(['/'])
	}



}
