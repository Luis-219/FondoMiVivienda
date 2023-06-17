import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { config } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { Property } from 'src/app/models/Property';
import { Quotation } from 'src/app/models/Quotation';
import { showquot } from 'src/app/models/Showquot';
import { ClientService } from 'src/app/services/client.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  id!: number;
  constructor(private clientservice: ClientService,
              private activatedRouter:ActivatedRoute,
              private route: Router,
              private configservice: ConfigurationService,
              private propservice: PropertyService) { }

  ngOnInit(): void {
    const iduser = this.activatedRouter.snapshot.queryParamMap.get('iduser');
    this.id = Number(iduser);
    this.loadUser();
  }


  completequots!:Quotation[];
  loadquots(){
    this.configservice.getquotbyUserID(this.id).subscribe({
      next:(data)=>{
        this.completequots = data;

        this.join();
      }
    })
  }


  props!: Property[];
  join(){
    this.propservice.getproperties().subscribe({
      next:(data)=>{
        this.props = data;
      }
    })
  }





  usernow!:Client;
  loadUser()
  {
    if(this.id!= undefined && this.id!= 0)
    {
      this.clientservice.getClientByID(this.id).subscribe(
        (data:Client)=>{
          this.usernow = data;
          this.loadquots();
        }
      );
    }
    else
    {
      this.route.navigate(["/login"]);
    }
  }
  
}
