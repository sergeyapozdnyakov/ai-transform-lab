import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-72px" } as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.58, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionArticle({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion ? undefined : { y: -4, transition: { duration: 0.18, delay: 0, ease } }
      }
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.article>
  );
}

export function MotionPanel({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion ? undefined : { y: -3, transition: { duration: 0.18, delay: 0, ease } }
      }
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = children.split(/\s+/);
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.04,
        staggerChildren: 0.045,
      },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease } },
  };

  return (
    <motion.h1
      aria-label={children}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      variants={container}
      className={className}
    >
      <span aria-hidden="true">
        {words.map((item, index) => (
          <motion.span key={`${item}-${index}`} variants={word} className="inline-block">
            {item}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
