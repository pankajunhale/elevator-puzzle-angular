import { IBuilding } from "../interface/building.interface";
import { IBuildingConfiguration } from "../interface/building.configuration.interface";
import { IElevatorConfiguration } from "../interface/elevator.configuration.interface";

export class Building implements IBuilding {
    BuildingConfigurationInfo: IBuildingConfiguration;
    ElevatorConfigurationInfo: IElevatorConfiguration;
    constructor(){
        
    }
}