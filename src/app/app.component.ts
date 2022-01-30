import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription, interval } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';


import { CalendarModel } from '../app/calendarModel'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'count-down-timer';

  calendarModel: CalendarModel

  constructor() {
    this.calendarModel = new CalendarModel();
  }

  startTimer() {
    this.calendarModel.showSendDataButton = false
    this.calendarModel.newa = new Date()
    this.calendarModel.timeLeft.length = 0
    this.calendarModel.interval = setInterval(() => {
      // if(this.calendarModel.timeLeft > -1) {
      this.getTimeDifferences(this.calendarModel.newa)
      // this.calendarModel.timeLeft++;
      // } else {
      // this.calendarModel.timeLeft = 0;
      // }
    }, 1000)

  }

  pauseTimer() {
    clearInterval(this.calendarModel.interval);
    this.calendarModel.showSendDataButton = true
  }
  getTimeDifferences(timeLeft) {
    this.calendarModel.timeDifference = new Date().getTime() - timeLeft;
    this.allocateTimeUnit(this.calendarModel.timeDifference);
  }

  allocateTimeUnit(timeDifference) {
    this.calendarModel.secondsToDday = Math.floor((timeDifference) / (this.calendarModel.milliSecondsInASecond) % this.calendarModel.SecondsInAMinute);
    this.calendarModel.minutesToDday = Math.floor((timeDifference) / (this.calendarModel.milliSecondsInASecond * this.calendarModel.minutesInAnHour) % this.calendarModel.SecondsInAMinute);
    this.calendarModel.hoursToDday = Math.floor((timeDifference) / (this.calendarModel.milliSecondsInASecond * this.calendarModel.minutesInAnHour * this.calendarModel.SecondsInAMinute) % this.calendarModel.hoursInADay);
    this.calendarModel.timeLeft = [this.calendarModel.hoursToDday, this.calendarModel.minutesToDday, this.calendarModel.secondsToDday,]
  }

  addEmployee = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)])
  })
  addEmployeeName(addEmployee) {
    this.calendarModel.name = addEmployee.controls.name.value;
  }
  addData() {
    this.calendarModel.storeEmployeeData.name = this.calendarModel.name
    this.calendarModel.storeEmployeeData.time = this.calendarModel.timeLeft
    this.calendarModel.storeData.push({...this.calendarModel.storeEmployeeData})
    this.calendarModel.name=''
    this.calendarModel.showSendDataButton =false
    this.calendarModel.timeLeft = [0,0,0]
    this.calendarModel.storeEmployeeData = {name: null, time: [0,0,0]}
    localStorage.setItem('time', JSON.stringify(this.calendarModel.storeData));
    this.calendarModel.showData = JSON.parse(localStorage.getItem('time'))
  }
}
