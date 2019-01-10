import { IElevatorConfigurationService } from "./elevator.configuration.service.interface";
import { BaseService } from "./base.service";
import { environment } from "../../../environments/environment";
import { IElevatorConfiguration } from "../interface/elevator.configuration.interface";
import { ElevatorConfiguration } from "../model/elevator.configuration";

export class ElevatorConfigurationService extends BaseService implements IElevatorConfigurationService {
    
    constructor(){
        super();
    }
    ConfigureElevator(): IElevatorConfiguration {
        const data = this.FindElevatorConfigurationData();
        const obj:IElevatorConfiguration = new ElevatorConfiguration(data.elevatorCount,data.isElevatorInterLinked,data.isZeroAsGround); 
        return obj;
    }

    private FindElevatorConfigurationData():any{
        const data = environment.elevatorConfiguration;
        return {
            elevatorCount:data.ElevatorCountPerBuilding,
            isElevatorInterLinked:data.IsElevatorAreInterlinked,
            isZeroAsGround:data.IsZeroConsdierAsGround
        }; 
     }
   
}