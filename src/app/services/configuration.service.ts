import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configfav } from '../models/Configfav';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http:HttpClient) { }

  addconfig(config: Configfav)
  {
    return this.http.post<Configfav>("http://localhost:3000/configfavs", config);
  }

  getconfigbyid(id: number)
  {
    return this.http.get<Configfav>("http://localhost:3000/configfavs/?idclient=" + id.toString());
  }

}
