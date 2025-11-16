'use client'
import { useState } from "react"

export default function PriceRange() {
  const [value, setValue] = useState(1.0);

  return (
      <div className="price-range p-4">
        <span className="text-sm">Index </span>
        <span className="text-sm">{value}</span>

        <input
          className="w-full accent-black"
          type="range"
          value={value}
          min="0"
          max="1.0"
          step='0.01'
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="-mt-2 flex w-full justify-between">
          <span className="text-sm text-gray-600">CO<sub>2</sub></span>
          <span className="text-sm text-gray-600">Cost</span>
        </div>
      </div>
  );
}