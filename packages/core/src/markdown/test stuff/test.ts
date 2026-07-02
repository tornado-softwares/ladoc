// 1.3.8

const is_bun = !Boolean(typeof Bun === 'undefined');

export const bun_markdown = (input: string) => {
  return Bun.markdown.html(input);
};

if (is_bun) {
  console.log(bun_markdown('# Hello **world**'));
} else {
  console.log('Uhh bun not supported');
}
