import { IFloor } from "./floor.interface";

export interface IBuildingConfiguration {
    Id:number;
    Name:string;
    NumberOfFloors:number;
    NumberOfBasement:number;
    IsBuildingHaveBasement:boolean;
    FloorList:Array<IFloor>;   
}