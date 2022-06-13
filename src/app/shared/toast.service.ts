import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private msgService: MessageService) { }

  success(message: string, title?: string) {
    this.showToast('success', message, title);
  }

  error(message: string, title?: string) {
    this.showToast('error', message, title);
  }

  info(message: string, title?: string) {
    this.showToast('info', message, title);
  }

  warning(message: string, title?: string) {
    this.showToast('warn', message, title);
  }

  clear() {
    this.msgService.clear();
  }


  private showToast(type: string, message: string, title?: string) {
    this.msgService.clear();
    this.msgService.add({
      severity: type,
      summary: title || `${type[0].toUpperCase()}${type.substring(1)}`,
      detail: message,
      sticky: type == 'error'
    })
  }

}
