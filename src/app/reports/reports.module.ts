import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';

@NgModule({
    declarations: [ReportViewerComponent, DocumentViewerComponent],
    providers: [DatePipe],
    imports: [
        CommonModule,
        SharedModule,
        ReportsRoutingModule,
        FormsModule,
        NgSelectModule,
        NgbTooltipModule,
        BlockUIModule.forRoot()
    ]
})
export class ReportsModule { }
