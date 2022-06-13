import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlContent'
})
export class HtmlContentPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/<[^>]+>/g, ' ').trim();
  }

}
