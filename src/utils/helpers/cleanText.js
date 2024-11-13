export function cleanText(text) {
  return text
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(
      /Question \d+|Answer\d*\.?|v2 \(latest\)|Not yet answered|Marked out of.*Flag question/g,
      ""
    )
    .replace(/[\n\r]+/g, " ")
    .replace(/ +/g, " ")
    .replace(/(\/{2,})+/g, "")
    .trim();
}
