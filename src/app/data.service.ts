import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';

@Injectable()
export class DataService {

	constructor( private _http: Http ) { }

	saveTask(text){    
    return this._http.post('/api/tasks', { text : text })  
            .map((response: Response) => response.json())
  }  
  
  getTasks(){       
    return this._http.get('/api/tasks')
            .map((response: Response) => response.json())
	}
	
  removeTask(_id){   
    return this._http.delete('/api/tasks/' + _id )  
            .map((response: Response) => response.json())
	}

}
