import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper-component',
  templateUrl: './wrapper-component.component.html',
  styleUrls: ['./wrapper-component.component.css']
})
export class WrapperComponentComponent implements OnInit {

  constructor(private router: Router) { }
  title = 'DarSlah';
  isExpanded: boolean = true;
  ngOnInit(): void {
  }

}
