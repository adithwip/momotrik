const sanitizeHTMLString = (htmlString: string) => htmlString.replace(/\n/g, '')
const parseHTMLString = (htmlString: string) => {
  return htmlString
    .split('</p>')
    .map((htmlString) => htmlString + '</p>')
    .filter((html) => html !== '</p>')
}
const splitHTMLArrayToHalf = (htmlList: string[]) => {
  const half = Math.ceil(htmlList.length / 2)
  const firstHalfMarkupList = htmlList.slice(0, half).join('')
  const secondHalfMarkupList = htmlList.slice(-half).join('')

  return {
    firstHalfMarkupList,
    secondHalfMarkupList,
  }
}

type FunctionReturn = {
  firstHalf: string
  secondHalf: string
}

export const parseAndSplitHTMLString = (markup: string): FunctionReturn => {
  const sanitizedMarkup = sanitizeHTMLString(markup)
  const markupList = parseHTMLString(sanitizedMarkup)

  const { firstHalfMarkupList, secondHalfMarkupList } =
    splitHTMLArrayToHalf(markupList)

  return {
    firstHalf: firstHalfMarkupList,
    secondHalf: secondHalfMarkupList,
  }
}
