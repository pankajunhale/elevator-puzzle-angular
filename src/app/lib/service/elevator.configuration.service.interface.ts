import { IBaseService } from "./base.service.interface";
import { IElevatorConfiguration } from "../interface/elevator.configuration.interface";

export interface IElevatorConfigurationService extends IBaseService {
    ConfigureElevator():IElevatorConfiguration;
}