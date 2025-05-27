import { 
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin, 
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CodeToggle,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin
} from '@mdxeditor/editor';
  
  export const mdxPlugins = [
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    tablePlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
    codeMirrorPlugin({ 
      codeBlockLanguages: { 
        js: 'JavaScript', 
        typescript: 'TypeScript',
        css: 'CSS',
        json: 'JSON',
        html: 'HTML',
        python: 'Python',
        bash: 'Bash',
        markdown: 'Markdown'
      } 
    })
  ];
  