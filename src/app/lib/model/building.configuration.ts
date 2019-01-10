import { IBuildingConfiguration } from "../interface/building.configuration.interface";
import { IFloor } from "../interface/floor.interface";
import { Floor } from "./floor";

export class BuildingConfiguration implements IBuildingConfiguration {
    
    Id: number;
    Name: string;
    NumberOfFloors: number;
    NumberOfBasement: number;
    IsBuildingHaveBasement: boolean;
    FloorList: IFloor[];

    constructor(name:string,numberOfFloors:number,numberOfBasement:number){
        this.Id = Date.now();
        this.Name = name;
        this.NumberOfFloors = numberOfFloors;
        this.NumberOfBasement = numberOfBasement;
        if(numberOfBasement>0){
            this.IsBuildingHaveBasement = true;
        }
        //compute and set floor list
        //this.FloorList = this.FindFloorList(numberOfFloors,numberOfBasement);
    }

    
}