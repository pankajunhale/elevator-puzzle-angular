import { IElevatorButton } from "../interface/elevator.button.interface";

export class ElevatorButton implements IElevatorButton {
    IsUpButtonPressed: boolean;
    IsDownButtonPressed: boolean;
    IsHaveBothButton: boolean;
    IsUpButton: boolean;
    IsDownButton: boolean;

    constructor(){
        
    }
}