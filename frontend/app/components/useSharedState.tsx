// hooks/useSharedState.ts
import { useState } from 'react';

export const useSharedState = () => {
  const [isClicked, setIsClicked] = useState(false);
  return { isClicked, setIsClicked };
};