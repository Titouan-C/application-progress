import { Injectable } from "@angular/core";
import { Company } from "../models/company.model";
import { Observable, liveQuery } from "dexie";
import { db } from "../indexed-db";

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
        console.log("ok");

        await db.companies.update(company.id, { ...company });
    }

    async addCompany(company: Company) {
        await db.companies.add({ ...company });
    }

    async getCompanyById(id: number): Promise<Company | null> {
        return await db.companies.get(id) || null;
    }
}