import { IElevatorService } from "./elevator.service.interface";
import { BaseService } from "./base.service";
import { Elevator } from "../model/elevator";
import { IElevator } from "../interface/elevator.interface";
import { IBuilding } from "../interface/building.interface";
import { ElevatorPrefix } from '../constants/app.constant';

export class ElevatorService extends BaseService  implements IElevatorService {


    constructor(){
        super();
    }
    
    FindElevators(buidling:IBuilding):Array<IElevator>{
        const listOfElevator:Array<IElevator> = new Array<Elevator>();     
        for (var index = 1; index <= buidling.ElevatorConfigurationInfo.NumberOfElevatorsPerBuilding; index++) {
            listOfElevator.push(this.AddElevatorsToBuilding(buidling,index));
        }
        return listOfElevator;
    }
    
    private AddElevatorsToBuilding(buidling:IBuilding,sequenceNumber:number): IElevator {
        const shortName = ElevatorPrefix + sequenceNumber.toString();
        const name =  "Elevator-" + sequenceNumber.toString();
        const obj:Elevator = new Elevator(name,shortName);
        obj.FloorList = obj.FindFloorList(buidling.BuildingConfigurationInfo.IsBuildingHaveBasement,
                                          buidling.ElevatorConfigurationInfo.IsZeroConsdierAsGround,
                                          buidling.BuildingConfigurationInfo.NumberOfFloors,
                                          buidling.BuildingConfigurationInfo.NumberOfBasement
                                        );
        return obj;
    }
}