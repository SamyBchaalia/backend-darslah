import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {ProductService} from '../shared/product.service'
import { from } from 'rxjs';
import{ NotificationService} from "../shared/notification.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,public service:ProductService,public notification: NotificationService) { }
  shops:any;
  dishs:any;
  boxs:any;
  test:any;

  Foodspecs:any = {name:'',price:'',description:'This Dar will tell you all about the births and marriages it has experienced ',image:'https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False'};
  imgSrc =
        "https://livejones.com/wp-content/uploads/2020/05/logo-Placeholder.png";
  selectedimg: any = null;

  ngOnInit(): void {
    console.log(this.service.form)
    this.http.get("http://localhost:8080/api/shops").subscribe((data) => {
          this.shops=data;
        });
        this.http.get("http://localhost:8080/api/dishs").subscribe((data) => {
          this.dishs=data;
        });
        this.http.get("http://localhost:8080/api/boxs").subscribe((data) => {
          this.boxs=data;
          console.log(data)
        });

    
  }
  edit(product:any)
  {
    console.log(product);
  }
  
  currentJustify = 'start';

  Foodname(event: any) { 
    this.Foodspecs.name = event.target.value;
  }
  Foodprice(event: any) { 
    this.Foodspecs.price = event.target.value;
  }
  Fooddescription(event:any){
    this.Foodspecs.description= event.target.value;
  }
  show(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.Foodspecs.image = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedimg = event.target.files[0];
    } else {
      this.Foodspecs.image =
        "https://livejones.com/wp-content/uploads/2020/05/logo-Placeholder.png";
      this.selectedimg = null;
    }
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    
  }
  onSubmit(){
    this.service.InsertProduct(this.service.form.value);
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notification.success("::eKHDem");
  }
}
