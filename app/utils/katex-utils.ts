
const standardStyURL = "https://raw.githubusercontent.com/rcatullo/standard-latex-papers/main/standard-operators.sty";
export { standardStyURL };

async function readStyFile(): Promise<string> {
  const response = await fetch(standardStyURL);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch macros: ${response.statusText}`);
  }
  
  return await response.text();
}

function findBalancedClosing(input: string, start: number) {
  let stack = 0;

  for (let i = start; i < input.length; i++) {
      const char = input[i];

      if (char === '{') stack++;
      if (char === '}') {
          stack--;
          if (stack === 0) return i;
      }
  }

  return 0;
}

function parseStytoMacros(fileContent: string) {
    const selectCmds = ["\\newcommand", "\\renewcommand", "\\DeclareMathOperator"];
    let macros = {};
    let i = 0;

    while (i < fileContent.length) {
        const command = selectCmds.find((cmd) => fileContent.startsWith(cmd, i));
        if (command) {
          const start = i;
          i = findBalancedClosing(fileContent, start);
          const firstArg = fileContent.slice(fileContent.indexOf('{', start) + 1, i);
          i = fileContent.indexOf('{', i)
          const end = findBalancedClosing(fileContent, i);
          const secondArg = fileContent.slice(i + 1, end);
          i = end + 1;
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
  const content = await readStyFile();
  return parseStytoMacros(content)
}