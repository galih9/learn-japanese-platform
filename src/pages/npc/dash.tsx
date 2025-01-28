import { motion } from "framer-motion"
import DASH from "../../assets/images/dash.png"

const variants = {
  rotate: { rotate: [0, -30, 0], transition: { duration: 0.5 } },
  stop: { y: [0, -10, 0], transition: { repeat: Infinity, repeatDelay: 2 } },
}

const DashPic = ({ rotate, className }: { rotate: boolean; className?: string }) => {
  return (
    <div className={className}>
      <motion.img
        variants={variants}
        animate={rotate ? "rotate" : "stop"}
        id="dash"
        src={DASH}
      />

    </div>
  )
}

export default DashPic
