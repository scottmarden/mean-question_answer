import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '.././user.service';
import { QuestionService } from '.././question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

	newQuestion: any = {
		question: "",
		description: "",
		email: localStorage.getItem("user_email"),
	}

	constructor(
		private _questionService: QuestionService,
		private _router: Router,
	){ }

	ngOnInit() {
		if(!localStorage.user_id){
			this._router.navigate(['/'])
		}
	}

	createQuestion(){
		this._questionService.serviceCreateQuestion(this.newQuestion)
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
