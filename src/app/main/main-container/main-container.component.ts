import { Component, OnInit, HostListener, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { delay, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { routeAnimations } from 'src/app/shared/animations';
import { AppRouteNames, Privileges } from 'src/app/shared/config-keys';

interface IMenuItem {
  label: string;
  route: string;
  icon: string;
  privilege?: string;
  subMenus?: IMenuItem[]
  id?: string
}
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  animations: [routeAnimations]
})
export class MainContainerComponent implements OnInit {
  isLoggedIn: boolean
  showSidebar: boolean
  menus: IMenuItem[];
  show: boolean = false

  @ViewChild('sidebar') sidebar: ElementRef
  @ViewChild('content') content: ElementRef
  @ViewChild('overlay') overlay: ElementRef

  constructor(private authService: AuthService,
    private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.checkLogin()
    this.setMenuItems();
  }

  checkLogin() {
    this.authService.loggedIn$.pipe(
      startWith(this.authService.isLoggedIn()),
      delay(0)
    ).subscribe(value => {
      this.isLoggedIn = value
    })
  }

  closeSideBar() {
    if (this.showSidebar) {
      this.renderer.removeClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.removeClass(this.content.nativeElement, 'toggle');
      this.renderer.removeClass(this.overlay.nativeElement, 'toggle');
      this.showSidebar = !this.showSidebar
    }
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar
    if (this.showSidebar) {
      this.renderer.addClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.addClass(this.content.nativeElement, 'toggle');
      this.renderer.addClass(this.overlay.nativeElement, 'toggle');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.removeClass(this.content.nativeElement, 'toggle');
      this.renderer.removeClass(this.overlay.nativeElement, 'toggle');
    }
  }

  logOut() {
    this.isLoggedIn = false
    this.authService.logout()
    this.router.navigate([AppRouteNames.Login])
  }

  private setMenuItems() {
    this.menus = [
      { label: "Dashboard", route: AppRouteNames.Dashboard, icon: "fas fa-lg fa-chart-line", privilege: Privileges.Dashboard },
      // { label: "Settings", route: AppRouteNames.Settings, icon: "fas fa-lg fa-cogs", privilege: Privileges.Setting },
      // { label: "Configure Roles", route: 'admin/roles', icon: "mdi mdi-lg mdi-tune", privilege: Privileges.RoleRead },
      // { label: "Manage Users", route: 'admin/users', icon: "fas fa-lg fa-users", privilege: Privileges.UserCreate },
    ];
  }
}
