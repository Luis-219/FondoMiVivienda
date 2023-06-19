import { ConfigurationService } from 'src/app/services/configuration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { Configquot } from 'src/app/models/Configquot';
import { Quotation } from 'src/app/models/Quotation';
import { ClientService } from 'src/app/services/client.service';
import { Property } from 'src/app/models/Property';
import { PropertyService } from 'src/app/services/property.service';
import { Payment } from 'src/app/models/Pago';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  idquot !: number;
  idprop!: number;
  iduser!: number;

  dataSource = new MatTableDataSource<Payment>();
  displayedColumns: string[] = ["periodo", "cuota","monto_seguro", "amortizacion", "interes","saldo"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute,
              private clientservice:ClientService,
              private configservice: ConfigurationService,
              private propservice: PropertyService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    const quot = this.route.snapshot.queryParamMap.get('idquot');
    const prop = this.route.snapshot.queryParamMap.get('idprop')
    const user = this.route.snapshot.queryParamMap.get('iduser');
    
    this.idquot = Number(quot);
    this.iduser = Number(user);
    this.idprop = Number(prop);
    this.loadUser();
    this.loadQuot();
    this.loadProp();
  }

  pago: Payment[] = [];
  myquot!:Quotation;
  configquot!: Configquot;

  paymenttable() {

    let tasa = this.myquot.tax / 100;
    let tasa_seguro = 0 / 100;

    let saldopagar = this.myquot.amount;
    let montototal = this.myquot.amount;

    let cuota = (montototal * (tasa + tasa_seguro)) / (1 - Math.pow(1 + tasa_seguro + tasa, -this.myquot.period));

    for (let i = 0; i < this.myquot.period; i++) {

      const intereses = saldopagar * tasa;
      const amortizacion = cuota - intereses - saldopagar * tasa_seguro;

      const nuevo_pago: Payment = {
        monto_seguro: saldopagar * tasa_seguro,
        saldo: saldopagar - amortizacion,
        periodo: i + 1,
        cuota: cuota,
        amortizacion: amortizacion,
        interes: intereses
      };
      console.log(nuevo_pago);
      this.pago.push(nuevo_pago);
      saldopagar -= amortizacion;
      console.log(nuevo_pago.saldo);
    }
    
    this.dataSource = new MatTableDataSource(this.pago);
    this.dataSource.paginator = this.paginator;

    console.log(this.pago);
  }
  
  save(){
    this.myquot.final = true;
    this.configservice.editQuot(this.myquot).subscribe({
      next:(data) =>{
        console.log(this.myquot);
        this.router.navigate(["main"], {
          queryParams:{
            iduser: this.iduser
          }
        })
      }
    });
  }

  back(){
    this.location.back();
  }





  property!:Property;
  loadProp(){
    this.propservice.getpropertiesbyID(this.idprop).subscribe({
      next:(data) =>{
        this.property = data;
      }
    })
  }


  loadQuot(){
    this.configservice.getquotbyID(this.idquot).subscribe({
      next: (data: Quotation) =>{
        this.myquot = data;

        this.configservice.getconfigquotbyid(this.myquot.idconfigquot).subscribe({
          next:(data:Configquot) =>{
            this.configquot = data;
            this.paymenttable();
          }
        })
      }
    })
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
