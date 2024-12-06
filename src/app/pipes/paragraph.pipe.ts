import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraph',
})
export class ParagraphPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value
      .split('\n')
      .map((paragraph) => `<p class="m-0 mb-2">${paragraph.trim()}</p>`)
      .join('');
  }
}
