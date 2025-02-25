/*
2025-02-25 15:21:27
Ref.
https://reactiive.io/articles/checkbox-interactions

*/

import { useCallback, useState } from "react";

const Cuisines = new Array(20).fill("Italian").map((cuisine, i) => ({
  id: i,
  name: cuisine,
  selected: false,
}));

export const useCuisines = () => {
  const [cuisines, setCuisines] = useState(Cuisines);

  const toggleCuisine = useCallback((id: number) => {
    setCuisines((prevCuisines) => {
      return prevCuisines.map((cuisine) => {
        if (cuisine.id === id) {
          return { ...cuisine, selected: !cuisine.selected };
        }
        return cuisine;
      });
    });
  }, []);

  return { cuisines, toggleCuisine };
};
