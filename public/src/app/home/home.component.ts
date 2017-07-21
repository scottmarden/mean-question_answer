import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '.././user.service';
import { QuestionService } from '.././question.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	questionsList: Array<any> = []

	user = {
		email: localStorage.getItem("user_email"),
		name: localStorage.getItem("user_name")
	}

	constructor(
		private _userService: UserService,
		private _questionService: QuestionService,
		private _router: Router
	) { }

	ngOnInit() {
		if(!localStorage.user_email){
			this._router.navigate(['/'])
		}
		this.getAllQuestions();
	}

	logout(){
		localStorage.clear()
		this._router.navigate(['/'])
	}

	getAllQuestions(){
		this._questionService.serviceAllQuestions()
			.then( questions => {
				console.log(questions)
				this.questionsList = questions
			})
			.catch( err => {
				console.log(err)
			})
	}


}
