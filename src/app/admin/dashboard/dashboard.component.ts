import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../shared/services/status.service';
import { Status } from '../../shared/models/status.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
}
