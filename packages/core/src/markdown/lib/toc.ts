import type { toc } from '../types/toc';

export const slugify = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-');

export const parse_header_content = (line: string) => {
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
    else if (letter == ']' && bracket_start_index && !bracket_end_index) bracket_end_index = i;
    else if (letter == ']' && bracket_start_index && bracket_end_index && bracket_end_index < i) bracket_end_index = i;
    else if (letter == '(' && !parenthesis_start_index && bracket_end_index) {
      if (bracket_end_index + 1 == i) parenthesis_start_index = i + 1;
      else break;
    } else if (letter == ')' && !parenthesis_end_index && parenthesis_start_index) parenthesis_end_index = i;
  }
  if (bracket_start_index && bracket_end_index && parenthesis_start_index && parenthesis_end_index) {
    const title = line.slice(bracket_start_index, bracket_end_index);
    const id = line.slice(parenthesis_start_index, parenthesis_end_index);
    return { level, title, id, user_slugged: true };
  } else if (diez_end_index) {
    const title = line.slice(diez_end_index);
    const id = '#' + slugify(title);
    return { level, title, id, user_slugged: false };
  }
};

//TODO : handle multiple links in a header
export const extract_toc = (input: string) => {
  const lines = input.split('\n');
  const toc: toc = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line.startsWith('# ') ||
      line.startsWith('## ') ||
      line.startsWith('### ') ||
      line.startsWith('#### ') ||
      line.startsWith('##### ') ||
      line.startsWith('###### ')
    ) {
      const data = parse_header_content(line);
      if (data) {
        const { user_slugged, ...toc_item } = data;
        toc.push(toc_item);
        if (!user_slugged) {
          lines[i] = '#'.repeat(toc_item.level) + ' ' + '[' + toc_item.title + ']' + '(' + toc_item.id + ')';
        }
      }
    }
  }
  return { toc, markdown: lines.join('\n') };
};

/*
console.log(
  extract_toc(`
# Hey
## HUHH

### [Bruhh](#hey)

#### [Bruhh [Neww]](#hey)


# Markdown: Syntax

*   [Overview](#overview)
    *   [Philosophy](#philosophy)
    *   [Inline HTML](#html)
    *   [Automatic Escaping for Special Characters](#autoescape)
*   [Block Elements](#block)
    *   [Paragraphs and Line Breaks](#p)
    *   [Headers](#header)
    *   [Blockquotes](#blockquote)
    *   [Lists](#list)
    *   [Code Blocks](#precode)
    *   [Horizontal Rules](#hr)
*   [Span Elements](#span)
    *   [Links](#link)
    *   [Emphasis](#em)
    *   [Code](#code)
    *   [Images](#img)
*   [Miscellaneous](#misc)
    *   [Backslash Escapes](#backslash)
    *   [Automatic Links](#autolink)


**Note:** This document is itself written using Markdown; you
can [see the source for it by adding '.text' to the URL](/projects/markdown/syntax.text).

----

## [Overview](#Damnn)

### Philosophy

Markdown is intended to be as easy-to-read and easy-to-write as is feasible.

Readability, however, is emphasized above all else. A Markdown-formatted
document should be publishable as-is, as plain text, without looking
like it's been marked up with tags or formatting instructions. While
Markdown's syntax has been influenced by several existing text-to-HTML
filters -- including [Setext](http://docutils.sourceforge.net/mirror/setext.html), [atx](http://www.aaronsw.com/2002/atx/), [Textile](http://textism.com/tools/textile/), [reStructuredText](http://docutils.sourceforge.net/rst.html),
[Grutatext](http://www.triptico.com/software/grutatxt.html), and [EtText](http://ettext.taint.org/doc/) -- the single biggest source of
inspiration for Markdown's syntax is the format of plain text email.

## Block Elements

### Paragraphs and Line Breaks

A paragraph is simply one or more consecutive lines of text, separated
by one or more blank lines. (A blank line is any line that looks like a
blank line -- a line containing nothing but spaces or tabs is considered
blank.) Normal paragraphs should not be indented with spaces or tabs.

The implication of the "one or more consecutive lines of text" rule is

  `)
);
*/
