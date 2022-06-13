import { Component, ElementRef, Input, AfterViewInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filter-box',
    templateUrl: './filter-box.component.html',
    styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements AfterViewInit {
    @Input('text') text: string
    @Input('small') small: boolean
    @ViewChild('filterElements') elements: ElementRef
    @Output() onSearch = new EventEmitter<void>()

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        this.disableCloseFormOnElementClick()
    }

    search() { this.onSearch.emit(); }

    private disableCloseFormOnElementClick() {
        this.renderer.listen(this.elements.nativeElement, 'click', (e) => {
            e.stopPropagation()
        })
    }
}
