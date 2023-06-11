import { Configfav } from './../../models/Configfav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from 'src/app/services/configuration.service';

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
              private formBuilder:FormBuilder,
              private snackBar: MatSnackBar,
              private configfavservice: ConfigurationService) { }

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


  exist?:Configfav;
  save(){

    const configfav:Configfav = {
      id:0,
      idclient: this.usernow.id,
      tasa: this.tipotasa,
      capitalizacion: this.myForm.get('capital')!.value,
      periodgracia: this.myForm.get('gracia')!.value,
      moneda: this.moneda
    };

    this.configfavservice.getconfigbyid(configfav.idclient).subscribe({
      next:(data)=>{
        this.exist = data;
      }
    })
    if(this.exist != undefined){
      if( this.myForm.valid ){
        this.configfavservice.addconfig(configfav).subscribe({
          next: (data)=>{
            this.snackBar.open("Se añadió la config como favorita", 'OK', {
              duration: 2000 });
          }
        });
      }else{
        this.snackBar.open("Debe completar los campos requeridos", '',{
          duration: 3000});
      }
    }
    else{
      this.snackBar.open("Ya tiene una configuración favorita", '',{
        duration: 3000});
    }
    

    
  }

  continue(){

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
