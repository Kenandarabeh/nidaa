export function extractAnswers(htmlContent) {
  const regex = /<input[^>]*?value="(\d+)"[^>]*?>\s*<p[^>]*?>([^<]+)<\/p>/g;
  // const inputregex = /<input[^>]*?name="([^"]+)"[^>]*?value="([^"]*)"[^>]*?>/g;
  const data = [];
  let match;
  // extract question type
  // let answerType;
  //  inputregex.exec(htmlContent);
  //  inputregex.exec(htmlContent);
  // answerType= inputregex.exec(htmlContent);
  // if(answerType){
  //   answerType= inputregex.exec(htmlContent);
  //   const name = answerType[1].trim();
  //   const value = answerType[2].trim();
  //   console.log("input",name , value)
  // }

  while ((match = regex.exec(htmlContent)) !== null) {
    const value = match[1].trim();
    const name = match[2].trim();

    data.push({ name, value });
  }
  data.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  return data;
}

export function extractJumpTo(htmlContent) {
  const jumptoRegex = /<input[^>]*?name="jumpto"[^>]*?value="(-?\d+)"[^>]*?>/;
  const pageIdRegex = /<input[^>]*?name="pageid"[^>]*?value="(\d+)"[^>]*?>/;
  const jumptoMatch = jumptoRegex.exec(htmlContent);
  const pageIdMatch = pageIdRegex.exec(htmlContent);

  if (pageIdMatch) {
    const currentPageId = parseInt(pageIdMatch[1], 10);

    if (jumptoMatch) {
      const jumptoValue = parseInt(jumptoMatch[1], 10);

      // Check if jumptoValue is -1 move to next page
      if (jumptoValue === -1) {
        return currentPageId + 1;
      }

      return jumptoValue;
    }
  }

  return null;
}
