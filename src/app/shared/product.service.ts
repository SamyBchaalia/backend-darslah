import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators  } from '@angular/forms';
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  ProductList:any;
  form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    name : new FormControl('',Validators.required),
    description : new FormControl(''),
    image : new FormControl(''),
    Quantity: new FormControl(''),
    price : new FormControl(0)
 
  });
  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      name: '',
      description: '',
      image: '',
      Quantity: '',
      price: '1',
     
    });
  

  }
 getProducts(){
    return this.http.get(`http://localhost:8080/api/shops`);}
InsertProduct(Product:any){
  let ProductInsert={name:Product.name,description:Product.description,image:Product.image,Quantity:Product.Quantity,price:Product.price}
  this.http.post(`http://localhost:8080/api/shop`,ProductInsert,{responseType: "text",}).subscribe((data)=>{
    console.log(data);
  })
}
UpdateProduct(Product){
  this.http.put(`http://localhost:8080/api/shop/`+Product.$key,Product,{responseType:"text"}).subscribe((data)=>{
    console.log(data);
  })
}
DeleteProduct($key:String){
  this.http.delete(`http://localhost:8080/api/shop/${$key}`,{responseType:"text"}).subscribe((data)=>{
    console.log(data);
  })
}
  
complete(Product){
  this.form.setValue({
    $key:Product.id,
    name:Product.name,
    description:Product.description,
    image:Product.image,
    Quantity:'',
    price:Product.price
  });

}
  
}

