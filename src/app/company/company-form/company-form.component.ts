import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company.model';
import { customNameValidator } from './customName.directive';

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
    id: [0, [
      Validators.required,
      Validators.min(0)
    ]],
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;
    if (this.model === null) {
      this.model = new Company(-1, '', '', '');
    } else {
      this.companyForm.patchValue(this.model);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.companyForm.valid) {
      this.model = { ...this.model!, ...this.companyForm.value };
      this.emitCompany.emit(this.model!);
    }
  }

  resetForm(): void {
    if (this.model !== null) {
      this.companyForm.patchValue(this.model);
    }
  }
}
