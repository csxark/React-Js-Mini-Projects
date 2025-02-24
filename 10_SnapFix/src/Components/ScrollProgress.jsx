import { useState, useEffect } from 'react';

export const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const windowScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScroll((windowScroll / height) * 100);
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-blue-500 z-40" 
      style={{ width: `${scroll}%` }}
    ></div>
  );
};

export default ScrollProgress;