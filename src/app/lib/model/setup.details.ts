import { IBuilding } from "../interface/building.interface";
import { IElevator } from "../interface/elevator.interface";

export class SetUpDetails {

    BuildingDetails:IBuilding;
    ElevatorDetails:Array<IElevator>;
    RequestedFloorNumber:number = 0;

    constructor(bulding:IBuilding,elevatorList:Array<IElevator>){
        this.BuildingDetails = bulding;
        this.ElevatorDetails = elevatorList;
    }
}