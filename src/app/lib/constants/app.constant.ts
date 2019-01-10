import {environment} from '../../../environments/environment';

export const ApiBasePath = environment.basePath; // read the base path from some config files 
export const ElevatorMaxHodlingTime:number = 10000; // miliseconds
export const ElevatorPrefix:string = "E-";