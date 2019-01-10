import { ConfiguartationService } from "./lib/service/configuration.service";
import { IBuilding } from "./lib/interface/building.interface";
import { ElevatorService } from "./lib/service/elevator.service";
import { IElevator } from "./lib/interface/elevator.interface";
import { ElevatorRestApi } from "./lib/rest-api/elevator.rest.api";
import { ElevatorMockDataRequest } from "./lib/model/elevator.mock.data";
import { Elevator } from "./lib/model/elevator";
import { SetUpDetails } from "./lib/model/setup.details";

export class EelevatorMain {
    private configurationService:ConfiguartationService = new ConfiguartationService();
    private elevatorService:ElevatorService = new ElevatorService();
    private restApi:ElevatorRestApi = new ElevatorRestApi()
    private MyElevators:Array<IElevator>;
    private MyBuilding:IBuilding;
    constructor(){
    }

    //read all from configuration/environment file..
    public GetSetDetails():SetUpDetails{
       this.MyBuilding = this.configurationService.FindConfiguration();
       this.MyElevators = this.elevatorService.FindElevators(this.MyBuilding);
       return new SetUpDetails(this.MyBuilding,this.MyElevators);
    }
    
    public DisplayResult(mockData:ElevatorMockDataRequest):any{
        mockData.Elevator.forEach((element:IElevator) => {
            element.ElevatorRunningStatusInfo.CurrentFloorNumber = parseInt(element.ElevatorRunningStatusInfo.CurrentFloorNumber.toString());
        }); 
        this.restApi.MyElevators = mockData.Elevator; 
        const result = this.restApi.Serve(mockData.RequestedFloorNumber);
        console.log(result);
        return result;
    }
}