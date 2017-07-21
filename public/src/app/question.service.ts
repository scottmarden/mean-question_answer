import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuestionService {

	constructor(
		private _http: Http
	) { }

	serviceCreateQuestion(question){
		return this._http.post('/api/create_question', question).map(response => response.json()).toPromise()
	}

	serviceAllQuestions(){
		return this._http.get('/api/all_questions').map(response => response.json()).toPromise()
	}

	serviceOneQuestion(question_id){
		return this._http.get('/api/question/' + question_id).map(response => response.json()).toPromise()
	}

}
