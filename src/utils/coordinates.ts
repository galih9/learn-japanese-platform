interface IProps {
  x: number
  y: number
}

export const calculateCoordinate = (elementId: string): IProps | undefined => {
  const element = document.getElementById(elementId)
  if (element != null) {
    const rect = element.getBoundingClientRect()

    const x = rect.x - 516
    const y = rect.y - 146

    return { x, y }
  }
}

export const calculateRandomNumber = (
  maxV?: number,
  minV?: number,
  toRound?: boolean,
): number => {
  const max = maxV ?? 100
  const min = minV ?? 30
  const result = Math.random() * (max - min) + min
  if (toRound) {
    return Math.round(result)
  }
  return result
}

export const generateRandomNumber = (maxV?: number, minV?: number): number => {
  const max = maxV ?? 10
  const min = minV ?? 0
  return Math.round(Math.random() * (max - min) + min)
}

export function removeItemFromArray<T>(array: T[], itemToRemove: T): T[] {
  return array.filter(item => item !== itemToRemove)
}
