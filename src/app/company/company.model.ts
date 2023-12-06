export class Company {
    id: number | null;
    name: string | null;
    address: string | null;
    status: string | null;

    constructor(id: number, name: string, address: string, status: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.status = status;
    }
}