import {
  lexer_elements,
  parser_elements,
  type LexerElement,
  type ParsedElement,
} from "@/markdown/constants";

function lexer(
  content: string,
  buffer = "",
  i = 0,
  lexers: LexerElement[] = [],
) {
  if (i == content.length - 1) {
    if (buffer) {
      lexers.push(["TEXT", buffer]);
      buffer = "";
    }
    return { lexers, buffer };
  } else {
    const letter = content[i];
    let matched: LexerElement | null = null;
    for (const lexer of lexer_elements) {
      if (!matched || lexer[1].length > matched[1].length) {
        if (content.startsWith(lexer[1], i)) {
          matched = lexer;
        }
      }
    }
    if (matched) {
      if (buffer) {
        lexers.push(["TEXT", buffer]);
        buffer = "";
      }
      lexers.push(matched);
      return lexer(content, buffer, i + matched[1].length, lexers);
    } else {
      buffer += letter;
      return lexer(content, buffer, i + 1, lexers);
    }
  }
}

const sample = `  # Hello
##Hello
### Hello
#### Hello
##### **Hello**
###### Hello

~~The world is flat.~~
> Cogito ergosum

This is **bold** text.
This is *italic* text.

This is a \`inline code\`
This is a
\`\`\`
block code
\`\`\`
`;

const result = lexer(sample);

console.log(result);

for (const r of result.lexers) {
  console.log(r);
}

/*function parser(tokens: LexerElement[]) {
  const result: ParsedElement[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    console.log(token);
  }
}*/

export function parser(tokens: LexerElement[]) {
  const [result] = parse(tokens, 0);
  return result;
}

function parse(
  tokens: LexerElement[],
  start: number,
  stopToken?: LexerElement[0],
): [ParsedElement[], number] {
  const result: ParsedElement[] = [];

  let i = start;

  while (i < tokens.length) {
    if (stopToken && tokens[i]?.[0] === stopToken) {
      break;
    }

    const match = matchRule(tokens, i);

    if (!match) {
      result.push({
        type: "TEXT",
      });

      i++;
      continue;
    }

    result.push(match.node);
    i = match.next;
  }

  return [result, i];
}

function matchRule(
  tokens: LexerElement[],
  start: number,
): {
  node: ParsedElement;
  next: number;
} | null {
  for (const rule of parser_elements) {
    const [name, before, allowedChildren, after] = rule;

    //
    // opening token check
    //
    if (before !== null) {
      if (tokens[start]?.[0] !== before) {
        continue;
      }
    }

    //
    // plain text rule
    //
    if (before === null && after === null) {
      if (tokens[start]?.[0] !== "TEXT") {
        continue;
      }

      return {
        node: {
          type: name,
        },
        next: start + 1,
      };
    }

    //
    // consume children
    //
    let i = start + (before ? 1 : 0);

    const childTokens: LexerElement[] = [];

    while (i < tokens.length) {
      const current = tokens[i];

      if (after && current[0] === after) {
        break;
      }

      if (allowedChildren && !allowedChildren.includes(current[0])) {
        break;
      }

      childTokens.push(current);
      i++;
    }

    //
    // required closing token
    //
    if (after) {
      if (tokens[i]?.[0] !== after) {
        continue;
      }
    }

    const [children] = parse(childTokens, 0);

    return {
      node: {
        type: name,
        children,
      },
      next: i + (after ? 1 : 0),
    };
  }

  return null;
}

console.log(JSON.stringify(parser(result.lexers), null, 2));

/*


console.log(
  lexer(`
  # Hello
  ## Hello
  ### Hello
  #### Hello
  ##### Hello
  ###### Hello

  # HeeeHeee {#jackson}

  This is **bold** text.
  This is *italic* text.
  Here's a sentence with a footnote. [^1]

  > Cogito ergosum

  ~~The world is flat.~~

  [^1]: This is the footnote.

  This is a \`inline code\`
  This is a
  \`\`\`
  block code
  \`\`\`

   	---

 - [x] Write the press release
 - [ ] Update the website
 - [ ] Contact the media

 1. First item
 2. Second item
 3. Third item

 - First item
 - Second item
 - Third item

  	---

  That is so funny! :joy:

   	I need to highlight these ==very important words==.
[title](https://www.example.com)
 	![alt text](image.jpg)
    `),
);
*/
