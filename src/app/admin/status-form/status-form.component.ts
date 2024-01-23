import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Status } from '../../shared/models/status.model';
import { StatusService } from '../../shared/services/status.service';

@Component({
  selector: 'app-status-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './status-form.component.html',
  styleUrl: './status-form.component.css'
})
export class StatusFormComponent implements OnInit {
  @Input()
  model: Status | null = null;
  @Output()
  emitStatus: EventEmitter<Status> = new EventEmitter<Status>();

  statusForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
    ]],
  });
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
  ) { }

  ngOnInit(): void {
    this.submitted = false;
    if (!this.model) {
      this.model = new Status(-1, '');
    } else {
      this.statusForm.patchValue(this.model);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.statusForm.valid) {
      this.model = { ...this.model!, ...this.statusForm.value };
      this.emitStatus.emit(this.model!);
    }
  }
}
