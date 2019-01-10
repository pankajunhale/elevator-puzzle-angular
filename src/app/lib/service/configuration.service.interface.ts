import { IBaseService } from "./base.service.interface";
import { IBuilding } from "../interface/building.interface";

export interface IConfigurationService {
    FindConfiguration():IBuilding;
}