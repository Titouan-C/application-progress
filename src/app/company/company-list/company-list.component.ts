import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Status, names } from '../status.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit, OnDestroy {
  currentCompany: Company | undefined | null;
  companyList = new Array<Company>();
  subscription: Subscription | undefined;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    if (!this.subscription) {
      this.subscription = this.companyService.getAllCompanies().subscribe(resCompanyList => {
        this.companyList = resCompanyList;
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setCurrentCompany(company: Company): void {
    this.currentCompany = null;
    setTimeout(() => {
      this.currentCompany = company;
    }, 10);
  }

  updateList(company: Company): void {
    let indexItem: number = this.companyList.findIndex(c => c.id === company.id);
    if (indexItem > -1) {
      this.companyList[indexItem] = { ...this.companyList[indexItem], ...company };
    } else {
      this.companyList.push(company);
    }
    
  }

 

  goToCompany(company: Company): void {
    this.router.navigate(['/company', company.id])
  }
  
  addNewCompany() {
    this.currentCompany = new Company(-1, "", "", new Status(names.EnAttente));
  }


}
