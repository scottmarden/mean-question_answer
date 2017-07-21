import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AnswerService {

	constructor(private _http: Http) { }

	serviceCreateAnswer(newAnswer){
		return this._http.post('/api/create_answer', newAnswer).map(response => response.json()).toPromise()
	}

	serviceGetAnswers(question_id){
		return this._http.get('/api/question_detail/' + question_id).map(response => response.json()).toPromise()
	}

	serviceLikeAnswer(answer_id){
		return this._http.get('/api/like_answer/' + answer_id).map(response => response.json()).toPromise()
	}



}
