import { Status } from "./status.model";

export class Company {
    id: number | undefined;
    name: string | null;
    address: string | null;
    status: Status | null;

    constructor(name: string, address: string, status: Status) {
        this.name = name;
        this.address = address;
        this.status = status;
    }
}