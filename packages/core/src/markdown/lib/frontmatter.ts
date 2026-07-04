import { parse as parse_yaml } from 'yaml';

export const extract_frontmatter = (input: string) => {
  const lines = input.split('\n');
  let start_index: number | undefined = undefined;
  let end_index: number | undefined = undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() == '') continue;
    if (line.trim() == '---') {
      if (!start_index) start_index = i + 1;
      else if (!end_index) {
        end_index = i;
        break;
      }
    } else if (!start_index) break;
  }
  if (start_index && end_index && start_index != end_index) {
    const frontmatter = lines.slice(start_index, end_index).join('\n');
    const markdown = lines.slice(end_index + 1).join('\n');
    return {
      frontmatter: parse_yaml(frontmatter),
      markdown,
    };
  }
  return { frontmatter: {}, markdown: input };
};
