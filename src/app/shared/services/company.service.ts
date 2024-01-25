import { Injectable } from "@angular/core";
import { Company } from "../models/company.model";
import { Observable, liveQuery } from "dexie";
import { db } from "../indexed-db";
import { Status } from "../models/status.model";

@Injectable()
export class CompanyService {
    mockCompanyList: Observable<Array<Company>> = liveQuery(
        () => this.listAllCompanies()
    );

    private async listAllCompanies(): Promise<Array<Company>> {
        return await db.companies.toArray();
    }

    getAllCompanies(): Observable<Array<Company>> {
        return this.mockCompanyList;
    }

    async updateCompany(company: Company) {
        if (company.id) {
            await db.companies.update(company.id, { ...company });
        } else {
            throw Error("L'identifiant de l'entreprise est inconnue");
        }
    }

    async addCompany(company: Company) {
        await db.companies.add({ ...company });
    }

    async getCompanyById(id: number): Promise<Company | null> {
        return await db.companies.get(id) || null;
    }

    async getCompaniesByStatus(status: Status): Promise<Array<Company>> {
        return await db.companies.where("status.id").equals(status.id).toArray();
    }
}