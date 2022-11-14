import {Component, Input, OnInit} from '@angular/core';
import {views, currentDate} from "./config";
import {Appointment} from "../../data";

@Component({
  selector: 'app-custom-scheduler',
  templateUrl: './custom-scheduler.component.html',
  styleUrls: ['custom-scheduler.component.css'],
})

export class CustomSchedulerComponent implements OnInit {
  @Input() dataSource: Appointment[];
  @Input() startDate: Date;
  @Input() endDate: Date;

  views = views;
  currentDate = currentDate;

  ngOnInit(): void {
  }
}
