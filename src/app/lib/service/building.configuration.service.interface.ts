import { IBaseService } from "./base.service.interface";
import { IBuildingConfiguration } from "../interface/building.configuration.interface";

export interface IBuidlingConfigurationService  {
    ConfigureBuilding():IBuildingConfiguration;
}