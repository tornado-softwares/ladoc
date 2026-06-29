export type LexerElement = [
  name:
    | "HASHx1"
    | "HASHx2"
    | "HASHx3"
    | "HASHx4"
    | "HASHx5"
    | "HASHx6"
    | "CR"
    | "SPACE"
    | "STARx1"
    | "STARx2"
    | "TEXT"
    | "TILDEx2"
    | "BACKSTICKx1"
    | "BACKSTICKx3"
    | "GREATER_THAN",
  value: string,
];

export type ParserElement = [
  name:
    | "H1"
    | "H2"
    | "H3"
    | "H4"
    | "H5"
    | "H6"
    | "BOLD"
    | "ITALIC"
    | "STRIKETHROUGH"
    | "INLINE_CODE"
    | "BLOCK_CODE"
    | "CITATION"
    | "TEXT",
  before: LexerElement[0] | null,
  children: LexerElement[0][] | null,
  after: LexerElement[0] | null,
];

export type ParsedElement = {
  type: ParserElement[0];
  children?: ParsedElement[];
};

export const lexer_elements: LexerElement[] = [
  ["HASHx1", "#"],
  ["HASHx2", "##"],
  ["HASHx3", "###"],
  ["HASHx4", "####"],
  ["HASHx5", "#####"],
  ["HASHx6", "######"],
  ["STARx1", "*"],
  ["STARx2", "**"],
  ["TILDEx2", "~~"],
  ["GREATER_THAN", ">"],
  ["CR", "\n"],
  ["BACKSTICKx1", "`"],
  ["BACKSTICKx3", "```"],
];

export const parser_elements: ParserElement[] = [
  ["H1", "HASHx1", ["TEXT"], "CR"],
  ["H2", "HASHx2", ["TEXT"], "CR"],
  ["H3", "HASHx3", ["TEXT"], "CR"],
  ["H4", "HASHx4", ["TEXT"], "CR"],
  ["H5", "HASHx5", ["TEXT"], "CR"],
  ["H6", "HASHx6", ["TEXT"], "CR"],
  ["ITALIC", "STARx1", ["TEXT", "CR"], "STARx1"],
  ["BOLD", "STARx2", ["TEXT", "CR"], "STARx2"],
  ["STRIKETHROUGH", "TILDEx2", ["TEXT", "CR"], "TILDEx2"],
  ["CITATION", "GREATER_THAN", ["TEXT"], "CR"],
  ["TEXT", null, ["TEXT", "CR"], null],
  ["INLINE_CODE", "BACKSTICKx1", ["TEXT", "CR"], "BACKSTICKx1"],
  ["BLOCK_CODE", "BACKSTICKx3", ["TEXT", "CR"], "BACKSTICKx3"],
];
