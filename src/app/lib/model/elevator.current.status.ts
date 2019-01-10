import { IElevatorRunningStatus } from "../interface/elevator.running.status.interace";
import { ElevatorCurrentStatusType } from "../enmus/elevator.status.type.enum";

export class ElevatorRunningStatus implements IElevatorRunningStatus {
    MovingType: ElevatorCurrentStatusType;
    IsMoving: boolean;
    MovingDirectionType: number;
    IsInHoldState: boolean;
    CurrentFloorNumber: number;

    constructor(){
        this.MovingType = ElevatorCurrentStatusType.STOPPED;
        this.IsMoving = false;
        this.IsInHoldState = false;
        this.CurrentFloorNumber = 0;
    }
}