export const extract_toc = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.startsWith('# ') ||
        line.startsWith('## ') ||
        line.startsWith('### ') ||
        line.startsWith('#### ') ||
        line.startsWith('##### ') ||
        line.startsWith('###### ')
    )
    .map((line) => {
      let level: number = 0;
      let diez_end_index: number | undefined = undefined;
      let bracket_start_index: number | undefined = undefined;
      let bracket_end_index: number | undefined = undefined;
      let parenthesis_start_index: number | undefined = undefined;
      let parenthesis_end_index: number | undefined = undefined;
      for (let i = 0; i < line.length; i++) {
        const letter = line[i];
        if (letter == '#') {
          level++;
          continue;
        }
        if (!diez_end_index) diez_end_index = i + 1;
        if (letter == '[' && !bracket_start_index) bracket_start_index = i + 1;
        else if (letter == ']' && !bracket_end_index && bracket_start_index) bracket_end_index = i;
        else if (letter == '(' && !parenthesis_start_index && bracket_end_index) {
          if (bracket_end_index + 1 == i) parenthesis_start_index = i + 1;
          else break;
        } else if (letter == ')' && !parenthesis_end_index && parenthesis_start_index) parenthesis_end_index = i;
      }
      if (bracket_start_index && bracket_end_index && parenthesis_start_index && parenthesis_end_index) {
        return { level, title: line.slice(bracket_start_index, bracket_end_index) };
      } else if (diez_end_index) {
        return { level, title: line.slice(diez_end_index) };
      }
    });
