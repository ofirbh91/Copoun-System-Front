import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-alert',
  templateUrl: './action-alert.component.html',
  styleUrls: ['./action-alert.component.css']
})
export class ActionAlertComponent implements OnInit {

  @Input() message: string;
  @Input() titlee: string;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
