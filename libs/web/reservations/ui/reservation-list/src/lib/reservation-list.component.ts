import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'whoa-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

  
}
