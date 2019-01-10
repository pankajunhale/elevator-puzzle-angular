import { IConfigurationService } from "./configuration.service.interface";
import { BaseService } from "./base.service";
import { IBuilding } from "../interface/building.interface";
import { Building } from "../model/building";
import { IBuildingConfiguration } from "../interface/building.configuration.interface";
import { BuidlingConfigurationService } from "./building.configuration.service";
import { IElevatorConfiguration } from "../interface/elevator.configuration.interface";
import { ElevatorConfigurationService } from "./elevator.configuration.service";

export class ConfiguartationService extends BaseService implements IConfigurationService {
    
    constructor(){
        super();
    }
    
    FindConfiguration(): IBuilding {
        let obj:IBuilding = new Building();
        obj.BuildingConfigurationInfo = this.FindBuildingConfiguration();
        obj.ElevatorConfigurationInfo = this.FindElevaotrConfiguration();
        return obj;
    }

    //building
    private FindBuildingConfiguration():IBuildingConfiguration{
        return new BuidlingConfigurationService().ConfigureBuilding();
    }
    //elevator
    private FindElevaotrConfiguration():IElevatorConfiguration{
        return new ElevatorConfigurationService().ConfigureElevator();
    }    

}