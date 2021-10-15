import Congressperson from "./congressperson.interface";

export default interface Party {
    id: number,
    name: string,
    acronym: string,
    members?: Congressperson[]
}