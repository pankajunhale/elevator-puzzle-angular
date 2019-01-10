import { IElevatorRestApi } from "./elevator.rest.api.interface";
import { Elevator } from "../model/elevator";
import { ElevatorCurrentStatusType } from "../enmus/elevator.status.type.enum";
import { ButtonType } from "../enmus/button.type.enum";
import { Floor } from "../model/floor";
import { ElevatorResponse } from "../model/elevator.response";
import { IElevator } from "../interface/elevator.interface";

export class ElevatorRestApi implements IElevatorRestApi {

    //private status:ElevatorCurrentStatusType = ElevatorCurrentStatusType.STOPPED;
    public MyElevators:Array<IElevator> = new Array<Elevator>();
    public IsRequestServed:boolean = false;
    constructor(){
        //set
    }

    GoUp(startFromFloorNumber:number,stopAtFloorNumber:number,allFloorList:Floor[],elevator:Elevator): void {
        
        const floorListToTraverse = allFloorList.filter((item:Floor)=>{
            return (item.FloorNumber > startFromFloorNumber && item.FloorNumber <= stopAtFloorNumber)
        });

        const floorListToTraverseNew = this.BlockList_ToGoUpFromDown(elevator,startFromFloorNumber);
        floorListToTraverse.forEach((item:Floor) => {
            if(item.FloorNumber == stopAtFloorNumber){
                this.Stop(stopAtFloorNumber,elevator,ElevatorCurrentStatusType.STOPPED);
            }
            else{
                //continue..
                this.Move(item.FloorNumber,elevator,ElevatorCurrentStatusType.DOWN);                
            }
        });
		// 	Status = ElevatorStatus.STOPPED;
    }
    GoDown(startFromFloorNumber:number,stopAtFloorNumber:number,allFloorList:Floor[],elevator:Elevator):void {
        const tempFloorListToTraverse:Array<any> = allFloorList.filter((item:Floor)=>{
            if(item.FloorNumber < startFromFloorNumber && item.FloorNumber >= stopAtFloorNumber){
                return item.FloorNumber;
            }
        });
        //sort descending or use reverse 
        const floorListToTraverse = tempFloorListToTraverse.reverse();
        floorListToTraverse.forEach((item:Floor) => {
            if(item.FloorNumber == stopAtFloorNumber){                
                this.Stop(stopAtFloorNumber,elevator,ElevatorCurrentStatusType.DOWN);
            }
            else{
                //continue..
                this.Move(item.FloorNumber,elevator,ElevatorCurrentStatusType.DOWN);
            }
        });
    }

    Move(floorNumberToMove,elevator:Elevator,goingInDirection:ElevatorCurrentStatusType): void{
        elevator.ElevatorRunningStatusInfo.CurrentFloorNumber = floorNumberToMove;
        elevator.ElevatorRunningStatusInfo.IsInHoldState = false;
        elevator.ElevatorRunningStatusInfo.IsMoving = true; //continue move.. 
    }
    
    Stop(stopAtFloorNumber:number,elevator:Elevator,goingInDirection:ElevatorCurrentStatusType): void {
        //change the eleavator status
        //is request server :: true
        elevator.ElevatorRunningStatusInfo.CurrentFloorNumber = stopAtFloorNumber;
        elevator.ElevatorRunningStatusInfo.IsInHoldState = false;
        elevator.ElevatorRunningStatusInfo.IsMoving = false; //stop
        elevator.ElevatorRunningStatusInfo.MovingDirectionType = goingInDirection;
        //
        this.IsRequestServed = true;
    }

    Start(elevator:Elevator,
        startFromFloorNumber:number,
        stopAtFloorNumber:number,
        serveFrom:ElevatorCurrentStatusType,
        requestedElevatorFromFloorNumber:number): void {

            //TC -1 - startAt:7,reqFloorNo:10,ServFrom:DOWN,stpAt:10 :: GoTop
            if(requestedElevatorFromFloorNumber < startFromFloorNumber) {
                this.GoDown(startFromFloorNumber,stopAtFloorNumber,elevator.FloorList,elevator);                
            }
            
            //TC -2 - startAt:10,reqFloorNo:3,ServFrom:UP,stpAt:3 :: GoDown
            if(requestedElevatorFromFloorNumber > startFromFloorNumber) {
                this.GoUp(startFromFloorNumber,stopAtFloorNumber,elevator.FloorList,elevator);
            }                     

    }
    Serve(requestedElevatorFromFloorNumber:number): ElevatorResponse {
        
        let objElevatorResponse:ElevatorResponse = new ElevatorResponse();
        objElevatorResponse.PathList = this.ServeShortestPath(requestedElevatorFromFloorNumber);
        this.IsRequestServed = false;
        const tempAscendingList = objElevatorResponse.PathList.sort((a:any,b:any)=> a.NumberOfElevaotrsToReach - b.NumberOfElevaotrsToReach);

        tempAscendingList.forEach((item) => {
            if(this.IsRequestServed == false){
                let elevator:Elevator = item.Elevator;
                const startFromFloorNumber:number = elevator.ElevatorRunningStatusInfo.CurrentFloorNumber;
                const stopAtFloorNumber:number = requestedElevatorFromFloorNumber;
                const serveFrom:ElevatorCurrentStatusType = item.ServeFrom;
    
                if(!elevator.ElevatorRunningStatusInfo.IsInHoldState){ //not in hold state
                    const direction = elevator.ElevatorRunningStatusInfo.MovingType;//undefined
                    this.Start(elevator,startFromFloorNumber,stopAtFloorNumber,serveFrom,requestedElevatorFromFloorNumber);                
                    //
                    objElevatorResponse.ShortestPath = item;
        
                }
            }           
        });
        return objElevatorResponse; 
    }
    private ServeShortestPath(requestedElevatorFromFloorNumber:number){
        let result;
        try {
            //add request to the queue and serve the shortest path
            //serve the shortest path list
            return this.GetShortestPath(requestedElevatorFromFloorNumber);            
        } catch (error) {
            //catch the errors...
        }
    }   

    //Test Case - 1
    private IsAllEleavatorsInStoppedState():boolean{
        const result = this.MyElevators.filter((item:Elevator,index:number)=>{
            return (item.ElevatorRunningStatusInfo.MovingDirectionType == ElevatorCurrentStatusType.STOPPED);
        });
        return (result.length <= 0);
    }

    //Test Case -  2 {E1: Moving UP , E2: Moving Down}

    // get shortest path algorithm
    private GetShortestPath(requestedElevatorFromFloorNumber:number):any{
        const data:Array<any> = new Array<any>();
        
        this.MyElevators.forEach((item:Elevator,index:number) => {
            //isactive..
            if(item.IsActive){
                if(requestedElevatorFromFloorNumber < item.ElevatorRunningStatusInfo.CurrentFloorNumber){  
                    //serve from top to bottom                    
                    data.push({
                        NumberOfElevaotrsToReach:this.GetBlockCountForUp(item,requestedElevatorFromFloorNumber),
                        Elevator:item,
                        ServeFrom:ElevatorCurrentStatusType.UP
                    });
                }                      
                if(requestedElevatorFromFloorNumber > item.ElevatorRunningStatusInfo.CurrentFloorNumber){                
                    //tricky..
                    //serve from bottom to top
                    data.push({
                        NumberOfElevaotrsToReach:this.GetBlockCountForDown(item,requestedElevatorFromFloorNumber),
                        Elevator:item,
                        ServeFrom:ElevatorCurrentStatusType.DOWN
                    });
                }
            }            
        });
        return data;
    }

    //serve from bottom to top
    private GetBlockCountForDown(elevator:Elevator,requestedElevatorFromFloorNumber:number):number{       
        return this.BlockList_ToGoUpFromDown(elevator,requestedElevatorFromFloorNumber).length;
    }
    //serve from top to bottom
    private GetBlockCountForUp(elevator:Elevator,requestedElevatorFromFloorNumber:number):number{       
        return this.BlockList_ToGoDownFromTop(elevator,requestedElevatorFromFloorNumber).length;
    }

    //sort asc and desc
    private SortAscending(elevatorPathList:Array<any>){
        const sortedPathList :Array<any> = elevatorPathList.sort((n1:any,n2:any) => n1.NumberOfElevaotrsToReach - n2.NumberOfElevaotrsToReach);
    }

    private BlockList_ToGoDownFromTop(elevator:Elevator,stopAtFloorNumber:number){
        let startFromFloorNumber = elevator.ElevatorRunningStatusInfo.CurrentFloorNumber;
        const floorListToTraverseToDown:Array<any> = elevator.FloorList.filter((item:Floor)=>{
            if(item.FloorNumber < startFromFloorNumber && item.FloorNumber >= stopAtFloorNumber){
                return item.FloorNumber;
            }
        });
        return floorListToTraverseToDown;
    }

    private BlockList_ToGoUpFromDown(elevator:Elevator,stopAtFloorNumber:number){
        let startFromFloorNumber = elevator.ElevatorRunningStatusInfo.CurrentFloorNumber;
        const floorListToTraverseToUp = elevator.FloorList.filter((item:Floor)=>{
            return (item.FloorNumber > startFromFloorNumber && item.FloorNumber <= stopAtFloorNumber)
        });
        return floorListToTraverseToUp;
    }
}
