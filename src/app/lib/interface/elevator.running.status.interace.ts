import { ElevatorCurrentStatusType } from "../enmus/elevator.status.type.enum";

export interface IElevatorRunningStatus {
    IsMoving:boolean;
    // Up / Down / Stopped => State
    MovingType:ElevatorCurrentStatusType; 
    IsInHoldState:boolean;
    CurrentFloorNumber:number;
}