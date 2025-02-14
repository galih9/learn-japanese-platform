import { motion } from "motion/react"

const ResultSubtitle: React.FC<{ correct: number }> = ({ correct }) => {
  const getResultProps = (correct: number) => {
    if (correct > 9) {
      return {
        text: "Perfect!!!",
        color: "text-green-500",
        animation: {
          scale: [1, 1.2, 1],
          transition: { repeat: Infinity, duration: 1 },
        },
      }
    }
    switch (correct) {
      case 9:
        return {
          text: "Okay",
          color: "text-blue-500",
          animation: {
            rotate: [0, 10, 0],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 8:
        return {
          text: "Nyeh",
          color: "text-yellow-500",
          animation: {
            rotate: [0, -10, 0],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 7:
        return {
          text: "Mediocre",
          color: "text-yellow-400",
          animation: {
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 6:
        return {
          text: "Sad",
          color: "text-orange-500",
          animation: {
            y: [0, 10, 0],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 5:
        return {
          text: "Really?",
          color: "text-orange-400",
          animation: {
            y: [0, -10, 0],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 4:
        return {
          text: "Oh no",
          color: "text-red-500",
          animation: {
            x: [0, 10, 0],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 3:
        return {
          text: "Just give up",
          color: "text-red-400",
          animation: {
            x: [0, -10, 0],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 2:
        return {
          text: "This isn't for you",
          color: "text-red-300",
          animation: {
            opacity: [1, 0.8, 1],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      case 1:
        return {
          text: "...",
          color: "text-gray-500",
          animation: {
            opacity: [1, 0.5, 1],
            transition: { repeat: Infinity, duration: 1 },
          },
        }
      default:
        return { text: "", color: "", animation: {} }
    }
  }

  const { text, color, animation } = getResultProps(correct)

  return (
    <motion.p className={color} animate={animation}>
      {text}
    </motion.p>
  )
}

export default ResultSubtitle
