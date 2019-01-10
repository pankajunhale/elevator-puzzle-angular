import { IBaseService } from "./base.service.interface";
import {ApiBasePath} from '../constants/app.constant';

export class BaseService implements IBaseService {
    BasePath: string;

    constructor(){
        this.BasePath = ApiBasePath;
    }
}