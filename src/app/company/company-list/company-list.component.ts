import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit, OnDestroy {
  currentCompany: Company | undefined;
  companyList: Array<Company> | undefined;
  subscription: Subscription | undefined;
  subscriptionTwo: Subscription | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    if (!this.subscription) {
      this.subscription = this.companyService.getAllCompanies().subscribe(resCompanyList => {
        this.companyList = resCompanyList;

        if (this.companyList.length > 0) {
          this.currentCompany = this.companyList.at(0);
        }
      })
    }
  }

  rotateCompanyClicked(): void {
    if (!this.subscriptionTwo) {
      this.companyService.rotateAllCompanies().subscribe(company => {
        this.currentCompany = company;
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionTwo) {
      this.subscriptionTwo.unsubscribe();
    }
  }

}
