import { BasePackage } from "../BasePackage";
import { Native } from "./terraform/native"
 
export function validate(fName: string): BasePackage{
    return new Native(fName);
}