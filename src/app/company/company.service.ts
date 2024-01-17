import { Injectable } from "@angular/core";
import { Company } from "./company.model";
import { Observable, concatMap, delay, of, from } from "rxjs";
import { Status, names } from "./status.model";

@Injectable()
export class CompanyService {
    mockCompanyList: Array<Company> = [
        new Company(1, 'Airbus', '2 rue des maronniers Blagnac 31700', new Status(names.EnAttente)),
        new Company(2, 'CGI', '5 rue des maronniers Blagnac 31700', new Status(names.EnAttente)),
        new Company(3, 'Sopra', '10 rue des grenadiers Blagnac 31700', new Status(names.EnAttente))
    ];

    getAllCompanies(): Observable<Array<Company>> {
        return of(this.mockCompanyList).pipe(delay(1000));
    }

    rotateAllCompanies(): Observable<Company> {
        return from(this.mockCompanyList).pipe(
            concatMap(item => of(item).pipe(delay(5000)))
        );
    }

    updateCompany(company: Company): Observable<Array<Company>> {
        const index = this.mockCompanyList.findIndex(c => c.id === company.id);
        if (index !== -1) {
            this.mockCompanyList[index] = Object.assign({}, company);
        } else {
            throw Error(`La société d'identifiant ${company.id} n'existe pas`);
        }
        return this.getAllCompanies();
    }

    getCompanyById(id: number): Observable<Company> {
        const company = this.mockCompanyList.find(c => c.id == id);
        if (!company) {
            throw Error(`La société d'identifiant ${id} n'existe pas`);
        } else {
            return of(company).pipe(delay(800));
        }
    }
}