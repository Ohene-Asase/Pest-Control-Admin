import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
    selector: '[authorize]'
})
export class AuthorizeDirective implements AfterViewInit {

    @Input('authorize') privileges: string

    constructor(private el: ElementRef, private authService: AuthService) { }

    ngAfterViewInit() {
        if (!this.authService.isAuthorize(this.privileges)) {
            this.el.nativeElement.remove()
        }
    }

}
