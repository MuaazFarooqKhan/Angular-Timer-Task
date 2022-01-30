export class CalendarModel {
    name: string;
    newa: Date;
    timeLeft = [];
    interval;
    timeDifference: number;
    secondsToDday: number;
    minutesToDday: number;
    hoursToDday: number;
    daysToDday: number;
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute = 60;
    showSendDataButton: boolean = false;
    storeEmployeeData= { "name" : null, "time": null};
    storeData = []
    showData = []
}