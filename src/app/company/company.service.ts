import { Injectable } from "@angular/core";
import { Company } from "./company.model";
import { Observable, concatMap, delay, of, from } from "rxjs";

@Injectable()
export class CompanyService {
    mockCompanyList: Array<Company> = [
        new Company(1, 'Airbus', '2 rue des maronniers Blagnac 31700', 'En Attente'),
        new Company(2, 'CGI', '5 rue des maronniers Blagnac 31700', 'En Attente'),
        new Company(3, 'Sopra', '10 rue des grenadiers Blagnac 31700', 'En Attente')
    ];

    getAllCompanies(): Observable<Array<Company>> {
        return of(this.mockCompanyList).pipe(delay(1000));
    }

    rotateAllCompanies(): Observable<Company> {
        return from(this.mockCompanyList).pipe(
            concatMap(item => of(item).pipe(delay(5000)))
        );
    }
}