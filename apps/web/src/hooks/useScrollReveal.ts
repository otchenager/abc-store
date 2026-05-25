import { useEffect } from "react";

export function useScrollReveal(trigger?: unknown) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const siblings = Array.from(el.parentElement?.children ?? []);
            const idx = siblings.indexOf(el) % 8;
            el.style.transitionDelay = `${idx * 0.08}s`;
            el.classList.add("revealed");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => {
      document.querySelectorAll(".reveal:not(.revealed)").forEach((el) => observer.observe(el));
    };

    observe();
    const timer = setTimeout(observe, 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
}
