import { RefObject, useState, useEffect } from "react";

function useIntersectionObserver(
  elementRef: RefObject<HTMLDivElement | null>,
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    console.log(entry);
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;
    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef.current, threshold, root, JSON.stringify(rootMargin)]);

  return entry;
}
export default useIntersectionObserver;
