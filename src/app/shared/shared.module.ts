import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateFormDirective } from './validate-form.directive';
import { ValidateFormControlDirective } from './validate-form-control.directive';
import { AuthorizeDirective } from './authorize.directive';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { TooltipDirective } from './tooltip.directive';
import { FileReaderDirective } from './file-reader';
import { SafePipe } from './safe.pipe';
import { HtmlContentPipe } from './html-content.pipe';
import { ImageLoadPipe } from './image-load.pipe';
import { LoadingTemplate } from './loading-template';
import { CustomSearchPipe } from './custom-search.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BtnLoadingDirective } from './btn-loading.directive';

@NgModule({
    imports: [
        CommonModule,
        ToastModule
    ],
    declarations: [
        ValidateFormDirective,
        ValidateFormControlDirective,
        FilterBoxComponent,
        FileReaderDirective,
        TooltipDirective,
        AuthorizeDirective,
        SafePipe,
        HtmlContentPipe,
        ImageLoadPipe,
        LoadingTemplate,
        CustomSearchPipe,
        BtnLoadingDirective
    ],
    exports: [
        ValidateFormDirective,
        ValidateFormControlDirective,
        FilterBoxComponent,
        FileReaderDirective,
        TooltipDirective,
        AuthorizeDirective,
        SafePipe,
        HtmlContentPipe,
        ImageLoadPipe,
        LoadingTemplate,
        CustomSearchPipe,
        BtnLoadingDirective,
        ToastModule
    ],
    providers: [MessageService]
})
export class SharedModule { }
