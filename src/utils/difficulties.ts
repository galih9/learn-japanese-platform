export interface IDDA {
  hiragana: number
  dakutenHiragana: number
  yoonHiragana: number
  katakana: number
  dakutenKatakana: number
  yoonKatakana: number
  blindScore:number
}

export const difficulties: IDDA[] = [
  {
    hiragana: 20,
    dakutenHiragana: 0,
    yoonHiragana: 0,
    katakana: 0,
    dakutenKatakana: 0,
    yoonKatakana: 0,
    blindScore: 30
  },
  {
    hiragana: 10,
    dakutenHiragana: 10,
    yoonHiragana: 0,
    katakana: 0,
    dakutenKatakana: 0,
    yoonKatakana: 0,
    blindScore: 80
  },
  {
    hiragana: 5,
    dakutenHiragana: 15,
    yoonHiragana: 5,
    katakana: 0,
    dakutenKatakana: 0,
    yoonKatakana: 0,
    blindScore: 100
  },
  {
    hiragana: 5,
    dakutenHiragana: 5,
    yoonHiragana: 10,
    katakana: 10,
    dakutenKatakana: 0,
    yoonKatakana: 0,
    blindScore: 200
  },
  {
    hiragana: 5,
    dakutenHiragana: 5,
    yoonHiragana: 5,
    katakana: 10,
    dakutenKatakana: 10,
    yoonKatakana: 0,
    blindScore: 250
  },
  {
    hiragana: 5,
    dakutenHiragana: 5,
    yoonHiragana: 5,
    katakana: 10,
    dakutenKatakana: 10,
    yoonKatakana: 10,
    blindScore: 300
  },
]
