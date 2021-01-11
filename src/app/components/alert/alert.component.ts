import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA)public data : any,private dialog:MatDialog) {
    this.message = this.data.message;
   }
   
   
  ngOnInit(): void {

  }

}