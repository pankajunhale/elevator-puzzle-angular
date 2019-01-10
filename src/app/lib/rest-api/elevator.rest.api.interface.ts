import { Elevator } from "../model/elevator";
import { ButtonType } from "../enmus/button.type.enum";
import { Floor } from "../model/floor";
import { ElevatorCurrentStatusType } from "../enmus/elevator.status.type.enum";

export interface IElevatorRestApi {
    GoUp(startFromFloorNumber:number,stopAtFloorNumber:number,allFloorList:Floor[],elevator:Elevator):void;
    GoDown(startFromFloorNumber:number,stopAtFloorNumber:number,allFloorList:Floor[],elevator:Elevator):void;
    Move(floorNumberToMove,elevator:Elevator,goingInDirection:ElevatorCurrentStatusType):void;
    Stop(stopAtFloorNumber:number,elevator:Elevator,goingInDirection:ElevatorCurrentStatusType):void;
    Start(elevator:Elevator,
        startFromFloorNumber:number,
        stopAtFloorNumber:number,
        serveFrom:ElevatorCurrentStatusType,
        requestedElevatorFromFloorNumber:number):void;
    Serve(requestedElevatorFromFloorNumber:number):void;
}