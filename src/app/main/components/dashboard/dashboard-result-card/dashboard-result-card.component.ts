import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-result-card',
  templateUrl: './dashboard-result-card.component.html',
  styleUrls: ['./dashboard-result-card.component.css']
})
export class DashboardResultCardComponent implements OnInit {

  @Input() title: string;
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

  formatValue(key: any, value: any){
    return key === 'ts' ? new Date(value).toLocaleString() : value;
  }

}
