import { IElevatorConfiguration } from "../interface/elevator.configuration.interface";

export class ElevatorConfiguration implements IElevatorConfiguration {
    NumberOfElevatorsPerBuilding: number;   
    ElevatorGeneralDetails: string;
    IsAllElevatorsLinkedEachOtherPerBuilding: boolean;
    IsZeroConsdierAsGround: boolean;
    
    constructor(numberofElevatorPerBuilding:number,isElevatorsInterLinked:boolean,isZeroAsGround:boolean){
        this.NumberOfElevatorsPerBuilding = numberofElevatorPerBuilding;
        this.IsAllElevatorsLinkedEachOtherPerBuilding = isElevatorsInterLinked;
        this.IsZeroConsdierAsGround = isZeroAsGround;
        this.ElevatorGeneralDetails = "ManufacturerName";       
    }
}