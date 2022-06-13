import { Directive, HostListener, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { TooltipEvent } from "bootstrap";
@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements AfterViewInit {

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        // tooltip(this.el.nativeElement)
        this.el.nativeElement.tooltip()
        // (<any>$('[data-toggle="tooltip"]')).tooltip()
    }


}
