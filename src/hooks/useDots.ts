// src/hooks/useDotGeneration.ts
import { useState, useCallback, useEffect } from 'react';

// Định nghĩa kiểu Dot
interface Dot {
  id: number;
  position: { x: number; y: number };
  active: boolean;
}

const generateDots = (count: number): Dot[] => {
  return Array.from({ length: count }, (_, id) => ({
    id:id+1,
    position: { x: Math.random() * 93, y: Math.random() * 90},
    active: false, 
  }));
};

export function useDots (initialDotCount: number) {
  const [dotCount, setDotCount] = useState<number>(initialDotCount);
  const [dots, setDots] = useState<Dot[]>(generateDots(dotCount));

  const updateDotCount = (newCount: number) => {
    setDotCount(newCount);
  };

  const generateAndSetDots = useCallback(() => {
    setDots(generateDots(dotCount));
  }, [dotCount]);

  useEffect(() => {
    setDots(generateDots(dotCount));
  }, [dotCount]);

  const resetDots = (newCount: number) => {
    setDotCount(0); 
    setDotCount(newCount); 
    setDots(generateDots(dotCount));
  };

  return { dots, resetDots, updateDotCount, generateAndSetDots };
}
