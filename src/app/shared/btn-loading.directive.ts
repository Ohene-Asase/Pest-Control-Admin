import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import { findWhere, where } from 'underscore';

@Directive({
  selector: '[btn-loading]'
})
export class BtnLoadingDirective implements AfterViewInit, OnChanges {
  @Input('btn-loading') public loading: any;
  @Input('loading-message') msg: string;
  originalText: string;

  constructor(public el: ElementRef,
    private renderer: Renderer2) {
  }

  ngAfterViewInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loading) {
      this.originalText = this.el.nativeElement.innerHTML;
      this.el.nativeElement.innerHTML = '';
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      this.renderer.appendChild(this.el.nativeElement, this.createSpinner());
    }
    else {
      if (!changes.loading.previousValue) return;
      this.removeSpinner();
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      this.el.nativeElement.innerHTML = this.originalText;
    }
  }

  createSpinner() {
    let spinner = this.renderer.createElement('i');
    this.renderer.addClass(spinner, 'fas');
    this.renderer.addClass(spinner, 'fa-spinner');
    this.renderer.addClass(spinner, 'fa-spin');

    let indicator = this.renderer.createElement('span');
    this.renderer.setProperty(indicator, 'id', 'load-ind');
    this.renderer.appendChild(indicator, spinner);
    if (this.msg) this.renderer.appendChild(indicator, this.renderer.createText(` ${this.msg}`));
    return indicator;
  }

  removeSpinner() {
    let children: HTMLCollection = this.el.nativeElement.children;
    let item = findWhere(children, { id: 'load-ind' });
    if (item) this.renderer.removeChild(this.el.nativeElement, item);
  }

}
