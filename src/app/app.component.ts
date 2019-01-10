import { Component } from '@angular/core';
import { EelevatorMain } from "./elevator.main";
import { SetUpDetails } from "./lib/model/setup.details";
import { IElevator } from "./lib/interface/elevator.interface";
import { ElevatorMockDataRequest } from "./lib/model/elevator.mock.data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'my-elevator-app';
  public SetUpDetails:SetUpDetails = null;
  private mainService:EelevatorMain = new EelevatorMain();
  private Result:any;
  constructor(){
    //read from config    
    this.SetUpDetails = this.mainService.GetSetDetails();
  }

  public SetCurrentStatus(item:IElevator){
    console.log(item);
  }

  public Submit(){
    let data:ElevatorMockDataRequest = new ElevatorMockDataRequest();
    data.Elevator = this.SetUpDetails.ElevatorDetails;
    data.RequestedFloorNumber =  parseInt(this.SetUpDetails.RequestedFloorNumber.toString());
    this.Result = this.mainService.DisplayResult(data);    
  }
}
