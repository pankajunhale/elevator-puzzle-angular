import { IFloor } from "./floor.interface";
import { ElevatorCurrentStatusType } from "../enmus/elevator.status.type.enum";
import { ElevatorRunningStatus } from "../model/elevator.current.status";

export interface IElevator {
    Id:number;
    Name:string;
    ShortName:string; // E1/E2/E3...En
    CanGoUp:boolean;
    CanGoDown:boolean;
    CanStopAtAllFloors:boolean;
    MaxHoldingTime:number; //miliseconds
    IsActive:boolean;
    FloorList: IFloor[];
    //hold all the info i.e. Run Time Status 
    ElevatorRunningStatusInfo:ElevatorRunningStatus;
}