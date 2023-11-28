import { Roles } from "./Roles";

export interface UserDto {
    username: string;
    roles: Roles[],
    mobileNo: string,
    email: string,
    district: string,
    subDistrict: string,
    status:boolean,
    password: string
    confirmPassword: string
}