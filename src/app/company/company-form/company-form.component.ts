import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company.model';
import { customNameValidator } from './customName.directive';
import { Status, names } from '../status.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';

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
  names = Object.values(names);
  currentRoute: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) { }

  convertToStatusEnum(statusName: string): Status | null {
    switch (statusName) {
      case "En Attente":
        return new Status(names.EnAttente);
      case "Refus":
        return new Status(names.Refus);
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
              this.companyService.getCompanyById(companyId).subscribe(company => {
                this.model = company;
                this.companyForm.patchValue({
                  name: this.model.name,
                  address: this.model.address,
                  status: this.model.status?.name || '',
                });
                this.isLoading = true;
              });
            }
          });
        }
      }
    });

    if (!this.model) {
      this.model = new Company(-1, '', '', new Status(names.EnAttente));
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
      this.model = { ...this.model!, ...this.companyForm.value, status: this.convertToStatusEnum(this.companyForm.value.status || '') };
      this.emitCompany.emit(this.model!);
      this.companyService.updateCompany(this.model);
      this.router.navigate(['company']);
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
