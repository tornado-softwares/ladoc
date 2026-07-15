import type { ThemeRegistration } from 'shiki'

export const shiki_theme: ThemeRegistration = {
  name: 'ladoc',
  type: 'dark',
  colors: {
    'editor.background': 'var(--_ladoc-color-card)',
    'editor.foreground': 'var(--_ladoc-color-text)',
  },
  settings: [
    {
      scope: ['support.function', 'entity.name.function', 'meta.function-call'],
       settings: { foreground: 'var(--_ladoc-syntax-function)' },
  },
    { settings: { foreground: 'var(--_ladoc-color-text)' } },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.control'],
      settings: { foreground: 'var(--_ladoc-syntax-keyword)' },
    },
    {
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: 'var(--_ladoc-syntax-string)' },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--_ladoc-syntax-comment)', fontStyle: 'italic' },
    },
    {
      scope: ['constant.numeric'],
      settings: { foreground: 'var(--_ladoc-syntax-number)' },
    },
    {
      scope: ['support.function', 'entity.name.function', 'meta.function-call'],
      settings: { foreground: 'var(--_ladoc-syntax-title)' },
    },
    {
      scope: ['support.type', 'support.class'],
      settings: { foreground: 'var(--_ladoc-syntax-built-in)' },
    },
    {
      scope: ['entity.name.class', 'entity.other.inherited-class'],
      settings: { foreground: 'var(--_ladoc-syntax-class)' },
    },
    {
      scope: ['variable', 'variable.parameter', 'variable.other'],
      settings: { foreground: 'var(--_ladoc-syntax-variable)' },
    },
    {
      scope: ['keyword.operator'],
      settings: { foreground: 'var(--_ladoc-syntax-operator)' },
    },
    {
      scope: ['punctuation'],
      settings: { foreground: 'var(--_ladoc-syntax-punctuation)' },
    },
    {
      scope: ['entity.name.tag'],
      settings: { foreground: 'var(--_ladoc-syntax-tag)' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: 'var(--_ladoc-syntax-attr)' },
    },
    {
      scope: ['constant.language', 'constant.character', 'support.constant'],
      settings: { foreground: 'var(--_ladoc-syntax-literal)' },
    },
    {
      scope: ['meta', 'meta.tag'],
      settings: { foreground: 'var(--_ladoc-syntax-meta)' },
    },
    {
      scope: ['markup.deleted', 'diff.deleted'],
      settings: { foreground: 'var(--_ladoc-syntax-deletion)' },
    },
    {
      scope: ['markup.inserted', 'diff.inserted'],
      settings: { foreground: 'var(--_ladoc-syntax-addition)' },
    },
    {
      scope: ['markup.italic', 'emphasis'],
      settings: { foreground: 'var(--_ladoc-syntax-emphasis)', fontStyle: 'italic' },
    },
    {
      scope: ['markup.bold', 'strong'],
      settings: { foreground: 'var(--_ladoc-syntax-strong)', fontStyle: 'bold' },
    },
  ],
}
