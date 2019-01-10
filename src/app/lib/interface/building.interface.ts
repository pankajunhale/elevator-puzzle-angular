import { IBuildingConfiguration } from "./building.configuration.interface";
import { IElevatorConfiguration } from "./elevator.configuration.interface";

export interface IBuilding {
    BuildingConfigurationInfo:IBuildingConfiguration;
    ElevatorConfigurationInfo:IElevatorConfiguration;
}