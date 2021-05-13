import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarConfig} from '@angular/material/snack-bar/snack-bar-config'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar:MatSnackBar) { }
   
  success(msg:string){
    this.snackBar.open(msg, "action", {
      duration: 2000,horizontalPosition:'center', verticalPosition:'top',
    });
  }
}
