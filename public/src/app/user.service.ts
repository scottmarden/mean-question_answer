import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class UserService {

	constructor(private _http: Http) { }

	serviceRegisterUser(user){
		return this._http.post('/api/register', user).map(response => response.json()).toPromise()
	}
	serviceLoginUser(credentials){
		return this._http.post('/api/login', credentials).map(response => response.json()).toPromise()
	}
}
