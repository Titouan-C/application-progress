import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../shared/services/status.service';
import { Status } from '../../shared/models/status.model';
import { StatusFormComponent } from '../status-form/status-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatusFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  statusList: Array<Status> = [];
  currentStatus: Status | undefined | null;

  constructor(
    private statusService: StatusService
  ) {
    this.statusService.getAllStatus().subscribe(
      data => {
        this.statusList = data;
      }
    )
  }

  setCurrentStatus(status: Status): void {
    this.currentStatus = null;
    setTimeout(() => {
      this.currentStatus = status;
    }, 10);
  }

  updateList(status: Status): void {
    const indexItem: number = this.statusList.findIndex(s => s.id === status.id);
    if (indexItem >= 0) {
      this.statusService.updateStatus(status);
    } else {
      this.statusService.addStatus(status.name);
    }
    this.statusService.getAllStatus().subscribe(
      data => {
        this.statusList = data;
      }
    );
    this.currentStatus = null;
  }

  addNewStatut() {
    this.currentStatus = new Status(-1, "");
  }
}
