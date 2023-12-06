import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company.model';
import { customNameValidator } from './customName.directive';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {
  companyForm = this.fb.group({
    id: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      customNameValidator(/CGI/)
    ]],
    address: ['', [
      Validators.required
    ]]
  }, { updateOn: "submit" });
  model: Company;

  constructor(private fb: FormBuilder) {
    this.model = new Company(
      1,
      'Airbus',
      '2 rue des maronniers Blagnac 31700'
    );
  }

  ngOnInit() {
    this.companyForm.patchValue(this.model);
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.model = { ...this.model!, ...this.companyForm.value };
      console.log(this.model);
    }
  }
}
