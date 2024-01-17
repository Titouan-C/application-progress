import { Status } from "./status.model";

export class Company {
    id: number;
    name: string | null;
    address: string | null;
    status: Status | null;

    constructor(id: number, name: string, address: string, status: Status) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.status = status;
    }
}