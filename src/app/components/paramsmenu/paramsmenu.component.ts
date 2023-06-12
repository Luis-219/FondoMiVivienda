import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-paramsmenu',
  templateUrl: './paramsmenu.component.html',
  styleUrls: ['./paramsmenu.component.css']
})
export class ParamsmenuComponent implements OnInit {

  idquot !: number;
  idconfig!: number;
  iduser!: number;

  constructor(private route: ActivatedRoute,
              private clientservice: ClientService,
              private router: Router) { }

  ngOnInit(): void {
    const quot = this.route.snapshot.queryParamMap.get('idquot');
    const config = this.route.snapshot.queryParamMap.get('idconfig');
    const user = this.route.snapshot.queryParamMap.get('iduser');
    
    this.idquot = Number(quot);
    this.idconfig = Number(config);
    this.iduser = Number(user);

    this.loadUser();
  }

  usernow!:Client;
  loadUser()
  {
    console.log(this.iduser);
    if(this.iduser!= undefined && this.iduser!= 0)
    {
      this.clientservice.getClientByID(this.iduser).subscribe(
        (data:Client)=>{
          this.usernow = data;
        }
      );
    }
  }
  


}

