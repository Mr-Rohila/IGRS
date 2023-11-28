import { Roles } from "./Roles";

export class MenuModel {
    labelEn: string;
    labelHi:string
    url: string;
    isActivate: boolean=false;
    child: MenuModel[];
    hasChild: boolean;
    roles:Roles[]=[]
}