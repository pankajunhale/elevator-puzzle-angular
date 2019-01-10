import { IFloor } from "../interface/floor.interface";
import { IElevatorButton } from "../interface/elevator.button.interface";

export class Floor implements IFloor {
    ButtonInfo: IElevatorButton;
    IsGround: boolean;
    IsTopMostFloor: boolean;
    IsBottomMostFloor: boolean;
    FloorNumber: number;

    constructor(){     
    }
}