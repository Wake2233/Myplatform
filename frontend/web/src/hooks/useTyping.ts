import { useEffect, useState } from "react";

/* Typewriter effect for the hero terminal line. */
export function useTyping(text: string, speed = 42, startDelay = 350) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let tick: ReturnType<typeof setTimeout>;
    const start = setTimeout(function step() {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) {
        tick = setTimeout(step, speed);
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(tick);
    };
  }, [text, speed, startDelay]);

  return { out, done };
}
