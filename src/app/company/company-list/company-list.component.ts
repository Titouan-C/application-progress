import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../../shared/models/company.model';
import { CompanyService } from '../../shared/services/company.service';
import { Router } from '@angular/router';
import { Subscription } from 'dexie';
import { Status } from '../../shared/models/status.model';

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
      this.subscription = this.companyService.getAllCompanies().subscribe(companies => {
        this.companyList = companies;
      });
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
    const indexItem: number = this.companyList.findIndex(c => c.id === company.id);
    if (indexItem >= 0) {
      this.companyService.updateCompany(company);
    } else {
      this.companyService.addCompany(company);
    }
    this.companyService.getAllCompanies().subscribe(
      companies => {
        this.companyList = companies;
      }
    );
    this.currentCompany = null;
  }

  goToCompany(company: Company): void {
    this.router.navigate(['/company', company.id])
  }

  addNewCompany() {
    this.currentCompany = new Company("", "", new Status(-1, ""));
  }
}
