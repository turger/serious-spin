import _ from 'lodash'

export const mapCloudWords = (wordData, categories = [], startYear, endYear) => {
  // omg
  const filteredWords = Object.keys(wordData)
    .reduce((accumulator, category) => {
      const wordsByYears = wordData[category]
      if(categories.includes(category) || _.isEmpty(categories)) {
        Object.keys(wordsByYears).forEach(year => {
          if(parseInt(startYear) <= parseInt(year) && parseInt(endYear) >= parseInt(year)) {
            const words = wordsByYears[year]
            Object.keys(words).forEach(word =>
              accumulator[word] = accumulator[word] + words[word] || words[word]
            )
          }
        })
      }
      return accumulator
    }, {})

  return Object.keys(filteredWords).map(word => ({text: word, value: filteredWords[word]}))
}