import Dexie, { Table } from "dexie";
import { Company } from "./models/company.model";
import { Status } from "./models/status.model";

export class IndexedDb extends Dexie {
    companies!: Table<Company, number>;
    status!: Table<Status, number>;

    constructor() {
        super('company-db')
        this.version(1).stores({
            companies: '++id, status.id',
            status: '++id'
        });
        this.on('populate', () => this.initDb());
    }

    async initDb() {
        await db.companies.bulkAdd([
            { id: 1, name: 'Airbus', address: '2 rue des maronniers Blagnac 31700', status: new Status(1, "En Attente") },
            { id: 2, name: 'CGI', address: '5 rue des maronniers Blagnac 31700', status: new Status(1, "En Attente") },
            { id: 3, name: 'Sopra', address: '10 rue des grenadiers Blagnac 31700', status: new Status(1, "En Attente") }
        ]);
        await db.status.bulkAdd([
            { id: 1, name: "En Attente" },
            { id: 2, name: "Refus" }
        ]);
    }
}

export const db = new IndexedDb();
