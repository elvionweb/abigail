import { useMemo } from "react";

function FloatingHearts({ count = 20, scoped = false }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: `${scoped ? "scoped" : "global"}-${index}`,
        left: `${Math.random() * 100}%`,
        size: 10 + Math.random() * 14,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 8,
        opacity: 0.2 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? "#F4A7B9" : "#C9706A",
      })),
    [count, scoped],
  );

  return (
    <div className={`pointer-events-none inset-0 overflow-hidden ${scoped ? "absolute" : "fixed -z-10"}`}>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-10%] animate-floatHeart"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
            color: heart.color,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;
