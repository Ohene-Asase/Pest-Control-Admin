import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  @Input() title: string;
  @Input() url: string;
  pdfUrl: string

  constructor(public activeModal: NgbActiveModal) {
    setTimeout(() => {
      this.pdfUrl = `data:application/pdf;base64,${this.url}`;
    }, 100);
  }

  ngOnInit() {
  }

}
