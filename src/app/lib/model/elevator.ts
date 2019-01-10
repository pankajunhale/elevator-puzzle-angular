import { IElevator } from "../interface/elevator.interface";
import {  ElevatorMaxHodlingTime } from '../constants/app.constant'
import { IFloor } from "../interface/floor.interface";
import { Floor } from "./floor";
import { ElevatorRunningStatus } from "./elevator.current.status";

export class Elevator implements IElevator {

    Id: number;
    Name: string;
    ShortName: string;
    CanGoUp: boolean;
    CanGoDown: boolean;
    CanStopAtAllFloors: boolean;
    MaxHoldingTime: number;
    IsActive: boolean;
    FloorList: IFloor[];
    ElevatorRunningStatusInfo: ElevatorRunningStatus;
    

    constructor(name:string,shortName:string){
        this.Id = Date.now();
        this.Name = name;
        this.ShortName = shortName;
        //all other props considered as TRUE for this test case...
        this.CanGoDown = true;
        this.CanGoUp = true;
        this.CanStopAtAllFloors = true;
        this.IsActive = true;
        //set holding time
        this.MaxHoldingTime = ElevatorMaxHodlingTime;
        //empty obj
        this.ElevatorRunningStatusInfo = new ElevatorRunningStatus();
        
    }

    //private methods
    public FindFloorList(isBuildingHaveBasement:boolean,isZeroAsGorund:boolean,numberOfFloors:number,numberOfBasement:number):Array<Floor>{
        let result:Array<Floor> = new Array<Floor>();
        if(isBuildingHaveBasement){
            //combine the two array <basement,floor> 
            const array1 = this.FindBasementFloorList(numberOfBasement);
            const array2 = this.FindFloorListExceptBasement(numberOfFloors,isZeroAsGorund,isBuildingHaveBasement);            
            result = array1.concat(array2);
        }
        else{
             result = this.FindFloorListExceptBasement(numberOfFloors,isZeroAsGorund,isBuildingHaveBasement);            
        }        
        return result;        
    }


    private FindFloorListExceptBasement(numberOfFloors:number,isZeroAsGorund:boolean,isBuildingHaveBasement:boolean):Array<Floor>{
        const list:Array<Floor> = new Array<Floor>();
        let counter:number;
        //add ground
        if(isZeroAsGorund){
            const objGround = new Floor();
            objGround.IsGround = true;
            objGround.FloorNumber = 0;  
            if(!isBuildingHaveBasement){
                objGround.IsBottomMostFloor = true;
            }          
            list.push(objGround);   
            counter = 1;         
        }        
        //add other
        for (let index = counter; index <= numberOfFloors; index++) {
            const objOtherFloor = new Floor();
            objOtherFloor.FloorNumber = index;
            if(index == counter) {
                if(!isZeroAsGorund){
                    // 1st will be ground..
                    objOtherFloor.IsGround = true;
                    if(!isBuildingHaveBasement){
                        objOtherFloor.IsBottomMostFloor = true;
                    }
                }
            }
            if(index == numberOfFloors) {
                objOtherFloor.IsTopMostFloor = true;
            }
            list.push(objOtherFloor);            
        }        
        return list;
    }
    
    private FindBasementFloorList(numberOfBasement:number):Array<Floor>{
        const list:Array<Floor> = new Array<Floor>();
        let basementNumber:number = 0;

        for (var index = 1; index <= numberOfBasement; index++) { 
            let tempBasementNumber:number = --basementNumber;
            const objBasementFloor = new Floor();
            objBasementFloor.FloorNumber = tempBasementNumber;
            objBasementFloor.IsGround = false;
            objBasementFloor.IsTopMostFloor = false;
            if(index == numberOfBasement){
                objBasementFloor.IsBottomMostFloor = true;
            }   
            else{
                objBasementFloor.IsBottomMostFloor = false;                
            }        
            list.push(objBasementFloor);            
        }
        //reverse... (-2,-1..go on..)
        return list.reverse();
    }   
}