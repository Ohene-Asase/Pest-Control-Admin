import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { MessageBox } from '../shared/message-helper';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string;
  appointments: any;
  constructor(private authService: AuthService,
              private dashboardService: DashboardService,
              private modalService: NgbModal,
    ) {
    this.username = authService.currentUser.name
  }

  ngOnInit() {
    this.fetchAppointments();
  }

  statusBadge(appointmentStatus: string) {
    switch (appointmentStatus) {
      case "Pending":
        return "bg-warning";

      case "Approved":
        return "bg-success";
      default:
        return "bg-dark";
    }
  }

  async fetchAppointments():Promise<any>{
   this.appointments =  await this.dashboardService.getAppointments();
   console.log(this.appointments)
 }

  async approveAppointment(id):Promise<any> {
  try {
    const confirm = await MessageBox.confirm("Confirm Apointment,", "Are you sure you want to approve?")
    if (!confirm.value) return;
    const success = await this.dashboardService.approval(id);
    if(success){
      location.reload();
    }

  } catch (error) { }

 }

 async disapproveAppointment(id):Promise<any>{
   try {
     const confirm = await MessageBox.confirm("Disapprove Appointment", "Are you sure you want to disapprove?")
     if(!confirm.value) return;
     const success = await this.dashboardService.disApproval(id);
     if(success){
       location.reload();
     }
   } catch (error) {
     
   }
 }

}
