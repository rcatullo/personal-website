import fs from 'fs'
import path from 'path'

const standardStyURL = "https://raw.githubusercontent.com/rcatullo/standard-latex-papers/refs/heads/main/standard.sty?<?php echo 'v=' . filemtime('app.js'); ?>"

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

async function readStyFile(): Promise<string> {
  const response = await fetch(standardStyURL);
  const fileContent = await response.text();
  return fileContent
}

function findBalancedClosing(input: string, start: number) {
  let stack = 0;

  for (let i = start; i < input.length; i++) {
      const char = input[i];

      if (char === '{') stack++; // Increment stack for an opening brace
      if (char === '}') {
          stack--; // Decrement stack for a closing brace
          if (stack === 0) return i; // Found the balanced closing brace
      }
  }

  return 0; // No balanced closing brace found (should not happen if braces are balanced)
}

function parseStytoMacros(fileContent: string) {
    type CMD = {
      commandString: string, // substring of fileContent containing the command and its arguments
      arg1: string, // first argument (new command)
      arg2: string // second argument (LaTeX it is replacing)
    }
    const selectCmds = ["\\newcommand", "\\renewcommand", "\\DeclareMathOperator"];
    let macros = {};
    let i = 0;

    while (i < fileContent.length) {
        const command = selectCmds.find((cmd) => fileContent.startsWith(cmd, i));
        if (command) {
          const start = i;
          i = findBalancedClosing(fileContent, start); // index of the first (balanced) closing brace
          const firstArg = fileContent.slice(fileContent.indexOf('{', start) + 1, i);
          i = fileContent.indexOf('{', i) // move index of the opening brace of the second argument
          const end = findBalancedClosing(fileContent, i); // index of the second (balanced) closing brace
          const secondArg = fileContent.slice(i + 1, end);
          i = end + 1; // move index to the next character after the closing brace
          if (command === "\\DeclareMathOperator") {
            macros = {
              ...macros,
              [firstArg]: `\\operatorname{${secondArg}}`
            }
          } else {
            macros = {
              ...macros,
              [firstArg]: secondArg
            }
          }
        } else {
            i++;
        }
    }

    const customMacros = {
      "\\gradient": "\\htmlClass{text-transparent}{#1}"
    };
    return { ...macros, ...customMacros };
}

export async function generateMacros(): Promise<Record<string, string>> { 
  let content = await readStyFile();
  return parseStytoMacros(content)
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'stacks', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
