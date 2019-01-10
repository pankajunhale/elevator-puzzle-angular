import { IElevatorButton } from "./elevator.button.interface";

export interface IFloor {
    FloorNumber:number;
    IsGround:boolean;
    IsTopMostFloor:boolean;
    IsBottomMostFloor:boolean;
    ButtonInfo:IElevatorButton;
}