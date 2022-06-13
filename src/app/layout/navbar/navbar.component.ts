import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {
  user: User = <User>{}
  title = 'PCM Admin';
  @Input() authenticated: boolean
  @Output() toggle = new EventEmitter()
  @Output() logout = new EventEmitter()

  constructor(private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.authenticated) {
      this.user = this.authService.currentUser
    }
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this.toggle.emit()
  }

  signOut() {
    this.logout.emit()
  }

}
