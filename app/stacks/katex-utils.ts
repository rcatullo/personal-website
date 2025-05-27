
const standardStyURL = "https://raw.githubusercontent.com/rcatullo/standard-latex-papers/refs/heads/main/standard-operators.sty?<?php echo 'v=' . filemtime('app.js'); ?>";

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