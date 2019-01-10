import { IElevator } from "../interface/elevator.interface";
import { IBuilding } from "../interface/building.interface";

export interface IElevatorService {
    FindElevators(buidling:IBuilding):Array<IElevator>;
}