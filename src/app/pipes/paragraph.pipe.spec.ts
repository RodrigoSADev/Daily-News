import { ParagraphPipe } from './paragraph.pipe';

describe('ParagraphPipe', () => {
  let pipe: ParagraphPipe;

  beforeEach(() => {
    pipe = new ParagraphPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform text with newlines into paragraphs', () => {
    const text = 'Paragraph 1\nParagraph 2\nParagraph 3';
    const transformed = pipe.transform(text);
    expect(transformed).toBe(
      '<p class="m-0 mb-2">Paragraph 1</p><p class="m-0 mb-2">Paragraph 2</p><p class="m-0 mb-2">Paragraph 3</p>'
    );
  });

  it('should handle empty string', () => {
    const text = '';
    const transformed = pipe.transform(text);
    expect(transformed).toBe('');
  });

  it('should handle null value', () => {
    const transformed = pipe.transform(null as unknown as string);
    expect(transformed).toBe(null);
  });

  it('should handle undefined value', () => {
    const transformed = pipe.transform(undefined as unknown as string);
    expect(transformed).toBe(undefined);
  });

  it('should trim paragraphs', () => {
    const text = '  Paragraph 1  \n  Paragraph 2  ';
    const transformed = pipe.transform(text);
    expect(transformed).toBe(
      '<p class="m-0 mb-2">Paragraph 1</p><p class="m-0 mb-2">Paragraph 2</p>'
    );
  });
});
