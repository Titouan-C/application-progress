import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../shared/models/company.model';
import { customNameValidator } from './customName.directive';
import { Status } from '../../shared/models/status.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company.service';
import { StatusService } from '../../shared/services/status.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {
  @Input()
  model: Company | null = null;
  @Output()
  emitCompany: EventEmitter<Company> = new EventEmitter<Company>();

  companyForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      customNameValidator(/IPI/)
    ]],
    address: ['', [
      Validators.required
    ]],
    status: ['', [
      Validators.required
    ]]
  }, { updateOn: "submit" });
  submitted = false;
  statusList: Array<Status> = [];
  currentRoute: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private statusService: StatusService,
    private router: Router
  ) {
    this.statusService.getAllStatus().subscribe(
      data => {
        this.statusList = data;
      }
    )
  }

  convertToStatus(statusName: string): Status | null {
    switch (statusName) {
      case "En Attente":
        return new Status(1, "En Attente");
      case "Refus":
        return new Status(2, "Refus");
      default:
        return null;
    }
  }

  isEditRoute(route: string): boolean {
    const regex = /^(edit\/)?\d+$/;
    return regex.test(route);
  }

  ngOnInit(): void {
    this.submitted = false;
    this.route.url.subscribe(segments => {
      if (!this.model) {
        this.currentRoute = segments.map(segment => segment.path).join('/');
        if (this.isEditRoute(this.currentRoute)) {
          this.route.params.subscribe(params => {
            const companyId = params['id'];
            if (companyId) {
              this.companyService.getCompanyById(companyId).then(
                company => {
                  this.model = company;
                  this.companyForm.patchValue({
                    name: this.model?.name,
                    address: this.model?.address,
                    status: this.model?.status?.name || '',
                  });
                });
              this.isLoading = true;
            }
          });
        }
      }
    });

    if (!this.model) {
      this.model = new Company('', '', new Status(-1, ''));
      this.isLoading = true;
    } else {
      this.companyForm.patchValue({
        name: this.model.name,
        address: this.model.address,
        status: this.model.status?.name || '',
      });
      this.isLoading = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.companyForm.valid) {
      this.model = { ...this.model!, ...this.companyForm.value, status: this.convertToStatus(this.companyForm.value.status || '') };
      this.emitCompany.emit(this.model!);
    }
  }

  resetForm(): void {
    if (this.model) {
      this.companyForm.patchValue({
        name: this.model.name,
        address: this.model.address,
        status: this.model.status?.name || '',
      });
    }
  }
}