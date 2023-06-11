import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  myForm!: FormGroup;


  caps = ["Mensual", "Bimestral", "Trimestral", "Cuatrimestral", "Semestral", "Anual"];
  gracias = ["Total", "Parcial"];



  constructor(private clientservice: ClientService,
              private activatedRouter:ActivatedRoute,
              private route: Router,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.id= this.activatedRouter.snapshot.params["id"];
    this.loadUser();
    this.loadform();
  }


  loadform(){
    this.myForm = this.formBuilder.group({
      capital: ["", [Validators.required]],
      gracia: ["", [Validators.required]]
    })
  }

  tipotasa!: string;
  checkradio(event: any){
    console.log(event.value);
    this.tipotasa = event.value;
    console.log(this.tipotasa);
  }

  moneda!: string;
  checkmoneda(event: any){
    console.log(event.value);
    this.moneda = event.value;
    console.log(this.moneda);
  }

  continue(){


    let tasa = this.tipotasa;
    let capital = this.myForm.get('capital')!.value;
    let gracia = this.myForm.get('gracia')!.value;
    let moneda = this.moneda;
    console.log(2);
    console.log(tasa);
    console.log(capital);
    console.log(gracia);
    console.log(moneda);


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
