import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ModalAnimate = ({ children, animateProps, isVisible, keyId }) => {

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div key={keyId} {...animateProps}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalAnimate
