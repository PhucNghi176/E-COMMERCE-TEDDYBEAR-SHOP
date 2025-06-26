import { motion } from "framer-motion"

export default function FloatingIcon() {
    return (
        <>
            <motion.div
                className="fixed top-10 left-10 text-amber-600 opacity-20"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                🧸
            </motion.div>
            <motion.div
                className="fixed top-20 right-20 text-amber-700 opacity-20"
                animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                🐻
            </motion.div>
            <motion.div
                className="fixed bottom-20 left-20 text-amber-800 opacity-20"
                animate={{
                    y: [0, -8, 0],
                    rotate: [0, 3, -3, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            >
                ❤️
            </motion.div>
        </>
    )
}
