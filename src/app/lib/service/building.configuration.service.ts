import { IBuidlingConfigurationService } from "./building.configuration.service.interface";
import { BaseService } from "./base.service";
import { IBuildingConfiguration } from "../interface/building.configuration.interface";
import { BuildingConfiguration } from "../model/building.configuration";
import { environment } from "../../../environments/environment";

export class BuidlingConfigurationService extends BaseService implements IBuidlingConfigurationService {
    
    //public/private variables    
    constructor(){
        super();
    }
    //methods
    ConfigureBuilding(): IBuildingConfiguration {  
        const name = "ABK";      
        const configurationData:any = this.FindBuildingConfigurationData();
        const obj:IBuildingConfiguration = new BuildingConfiguration(name,configurationData.floorCount,configurationData.basementCount);
        return obj;
    }

    private FindBuildingConfigurationData():any{
        const data = environment.builingConfiguration;
        return {
            floorCount:data.FloorCount,
            basementCount:data.BasementCount
        }; 
    }
}