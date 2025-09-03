"use client";

import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import girdLines from "@/assets/grid-lines.png";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  // Mouse tracking values
  const mouseX = useMotionValue(50); // Start centered
  const mouseY = useMotionValue(40); // Slightly higher (behind heading)

  // Radial gradient spotlight
  const splashMask = useMotionTemplate`
    radial-gradient(220px circle at ${mouseX}% ${mouseY}%, rgba(140, 68, 255, 0.4), transparent 80%)
  `;

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Mouse leave → animate spotlight back to center (behind text)
  const handleMouseLeave = () => {
    animate(mouseX, 50, { duration: 0.8, ease: "easeOut" });
    animate(mouseY, 40, { duration: 0.8, ease: "easeOut" });
  };

  return (
    <section
      className="py-20 md:py-24"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <motion.div
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative"
          animate={{
            backgroundPositionX: starsBg.width,
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg.src})`,
          }}
        >
          {/* Grid lines */}
          <div
            className="absolute inset-0 bg-blend-overlay"
            style={{
              backgroundImage: `url(${girdLines.src})`,
            }}
          />

          {/* Purple spotlight following mouse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: splashMask,
              mixBlendMode: "screen",
            }}
          />

          {/* Content */}
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
              AI-driven SEO for everyone.
            </h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Achieve clear, impactful results without the complexity.
            </p>
            <div className="flex justify-center mt-8">
              <Button>Join waitlist</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
