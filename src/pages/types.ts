export interface IInitialProps {
  data: IHiragana[]
}
export type IHiragana = {
  hira: string
  alpha: string
}

export type IResult = {
  timeSpent: string;
  score: number;
  wrong: number;
  correct: number;
  difficulty: string;
}

export const hiragana: IHiragana[] = [
  {
    hira: "あ",
    alpha: "a",
  },
  {
    hira: "い",
    alpha: "i",
  },
  {
    hira: "う",
    alpha: "u",
  },
  {
    hira: "え",
    alpha: "e",
  },
  {
    hira: "お",
    alpha: "o",
  },
  {
    hira: "か",
    alpha: "ka",
  },
  {
    hira: "き",
    alpha: "ki",
  },
  {
    hira: "く",
    alpha: "ku",
  },
  {
    hira: "け",
    alpha: "ke",
  },
  {
    hira: "こ",
    alpha: "ko",
  },
  {
    hira: "さ",
    alpha: "sa",
  },
  {
    hira: "し",
    alpha: "shi",
  },
  {
    hira: "す",
    alpha: "su",
  },
  {
    hira: "せ",
    alpha: "se",
  },
  {
    hira: "そ",
    alpha: "so",
  },
  {
    hira: "た",
    alpha: "ta",
  },
  {
    hira: "ち",
    alpha: "chi",
  },
  {
    hira: "つ",
    alpha: "tsu",
  },
  {
    hira: "て",
    alpha: "te",
  },
  {
    hira: "と",
    alpha: "to",
  },
  {
    hira: "な",
    alpha: "na",
  },
  {
    hira: "に",
    alpha: "ni",
  },
  {
    hira: "ぬ",
    alpha: "nu",
  },
  {
    hira: "ね",
    alpha: "ne",
  },
  {
    hira: "の",
    alpha: "no",
  },
  {
    hira: "は",
    alpha: "ha",
  },
  {
    hira: "ひ",
    alpha: "hi",
  },
  {
    hira: "ふ",
    alpha: "fu",
  },
  {
    hira: "へ",
    alpha: "he",
  },
  {
    hira: "ほ",
    alpha: "ho",
  },
  {
    hira: "ま",
    alpha: "ma",
  },
  {
    hira: "み",
    alpha: "mi",
  },
  {
    hira: "む",
    alpha: "mu",
  },
  {
    hira: "め",
    alpha: "me",
  },
  {
    hira: "も",
    alpha: "mo",
  },
  {
    hira: "や",
    alpha: "ya",
  },
  {
    hira: "ゆ",
    alpha: "yu",
  },
  {
    hira: "よ",
    alpha: "yo",
  },
  {
    hira: "ら",
    alpha: "ra",
  },
  {
    hira: "り",
    alpha: "ri",
  },
  {
    hira: "る",
    alpha: "ru",
  },
  {
    hira: "れ",
    alpha: "re",
  },
  {
    hira: "ろ",
    alpha: "ro",
  },
  {
    hira: "わ",
    alpha: "wa",
  },
  {
    hira: "を",
    alpha: "wo",
  },
  {
    hira: "ん",
    alpha: "n",
  },
]
