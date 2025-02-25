import { IHiragana } from "../pages/types"
import hiraganaChar from "../assets/db/hiragana.json"
import hiraganaDakutenChar from "../assets/db/hiragana_dakuten.json"
import hiraganaYoonChar from "../assets/db/hiragana_yoon.json"

// update play status
export function updatePlayStatus(list: IHiragana[], id: string): IHiragana[] {
  return list.map(item => {
    if (item.id === id) {
      return { ...item, played: true }
    }
    return item
  })
}

export function refillDeck(
  deck: IHiragana[],
  allCards: IHiragana[],
  size: number,
): IHiragana[] {
  const unplayedCards = allCards.filter(card => !card.played)
  const newDeck = deck.filter(card => !card.played)
  while (newDeck.length < size && unplayedCards.length > 0) {
    const randomIndex = Math.floor(Math.random() * unplayedCards.length)
    newDeck.push(unplayedCards.splice(randomIndex, 1)[0])
  }
  return newDeck
}

export const hiraganaToText = (hiragana: string): string => {
  const hiraganaMap: { [key: string]: string } = {}
  ;[...hiraganaChar, ...hiraganaDakutenChar, ...hiraganaYoonChar].forEach(
    char => {
      hiraganaMap[char.hira] = char.alpha
    },
  )

  let result = ""
  for (let i = 0; i < hiragana.length; i++) {
    const char = hiragana[i]
    if (char === "っ") {
      const nextChar = hiragana[i + 1]
      if (hiraganaMap[nextChar]) {
        result += hiraganaMap[nextChar][0]
      }
    } else if (hiraganaMap[char + hiragana[i + 1]]) {
      result += hiraganaMap[char + hiragana[i + 1]]
      i++
    } else if (hiraganaMap[char]) {
      result += hiraganaMap[char]
    } else {
      result += char
    }
  }

  return result.match(/[ぁ-ん]/) ? "" : result
}
