import { useEffect, useState } from "react";

const useClickOutside = (ref, cb) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      cb(e);
    };

    window.addEventListener("mousedown", listener);
    return () => window.removeEventListener("mousedown", listener);
  }, [ref, cb]);
};

const useDebounceHook = (searchVal, delay) => {
  const [debouncedSearchVal, setDebouncedSearchVal] = useState(searchVal);
  useEffect(() => {
    let id = setTimeout(() => {
        setDebouncedSearchVal(searchVal)
    }, delay);
    return ()=> clearTimeout(id)
  }, [delay, searchVal]);
  return debouncedSearchVal
};

export { useClickOutside, useDebounceHook };
