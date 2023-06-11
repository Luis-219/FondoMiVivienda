import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cotization',
  templateUrl: './cotization.component.html',
  styleUrls: ['./cotization.component.css']
})
export class CotizationComponent implements OnInit {

  id!: number;
  constructor(private clientservice: ClientService,
              private activatedRouter:ActivatedRoute,
              private route: Router) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.loadUser();
  }

  usernow!:Client;
  loadUser()
  {
    if(this.id!= undefined && this.id!= 0)
    {
      this.clientservice.getClientByID(this.id).subscribe(
        (data:Client)=>{
          this.usernow = data;
          console.log("name: " + this.usernow.id);
        }
      );
    }
    else
    {
      this.route.navigate(["/login"]);
    }
  }


}
