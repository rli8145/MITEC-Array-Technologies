"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Input: React.FC<{
  selectedCity?: string;
  setSelectedCity?: (city: string) => void;
}> = ({ selectedCity = "", setSelectedCity }) => {
  const router = useRouter();
  const cities = [
    { id: 1, name: "Los Angeles" },
    { id: 2, name: "Chicago" },
    { id: 3, name: "New York" },
    { id: 4, name: "Dallas" },
    { id: 5, name: "Houston" },
    { id: 6, name: "Detroit" },
    { id: 7, name: "Minneapolis" },
    { id: 8, name: "Boston" },
    { id: 9, name: "Seattle" },
    { id: 10, name: "Philadelphia" },
    { id: 11, name: "San Jose" },
    { id: 12, name: "Atlanta" },
    { id: 13, name: "San Francisco" },
    { id: 14, name: "Cleveland" },
    { id: 15, name: "Portland" },
    { id: 16, name: "Milwaukee" },
    { id: 17, name: "Phoenix" },
    { id: 18, name: "St. Louis" },
    { id: 19, name: "Cincinnati" },
    { id: 20, name: "San Diego" },
    { id: 21, name: "Grand Rapids" },
    { id: 22, name: "Indianapolis" },
    { id: 23, name: "Pittsburgh" },
    { id: 24, name: "Kansas City" },
    { id: 25, name: "Memphis" },
    { id: 26, name: "Albuquerque" },
  ];
  const [value, setValue] = useState(1.0);

  return (
    <div className="flex flex-col w-60 h-130 py-5 p-3 border bg-base items-center">
      <h1 className="font-bold text-2xl">Inputs</h1>
      <div className="flex flex-col">
        <form className="max-w-sm  space-y-4">
          <label
            htmlFor="visitors"
            className="text-sm font-medium text-heading"
          >
            Target Steel Cost
          </label>
          <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body">
            <span className="label-text my-auto">$</span>
            <input
              type="number"
              className="grow"
              placeholder="00.00"
              id="trailingAndLeadingInput"
            />
            <span className="label-text my-auto">Per Ton</span>
          </div>

          <label
            htmlFor="visitors"
            className="text-sm font-medium text-heading"
          >
            Target CO<sub>2</sub> Emissions
          </label>
          <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body">
            <span className="label-text my-auto">$</span>
            <input
              type="number"
              className="grow"
              placeholder="00.00"
              id="trailingAndLeadingInput"
            />
            <span className="label-text my-auto">
              CO<sub>2</sub> Ton/Steel Ton
            </span>
          </div>
          <label
            htmlFor="visitors"
            className="my-0.5  block text-sm font-medium text-heading "
          >
            CO<sub>2</sub>-Cost Tradeoff Ratio
          </label>
          <div className="flex flex-col border-black rounded-md  border-1 rounded-base">
            <div className="price-range p-4">
              <span className="text-sm">Index </span>
              <span className="text-sm">{value}</span>

              <input
                className="w-full accent-black"
                type="range"
                value={value}
                min="0"
                max="1.0"
                step="0.01"
                onChange={(e) => setValue(e.target.value)}
              />

              <div className="-mt-2 flex w-full justify-between">
                <span className="text-sm text-gray-600">
                  CO<sub>2</sub>
                </span>
                <span className="text-sm text-gray-600">Cost</span>
              </div>
            </div>
          </div>
          <label
            htmlFor="visitors"
            className="mb-2 block text-sm text-gray-400 text-heading my-[-10px]"
          >
            Note: an index of 1.0 represents low cost-high carbon footprint and
            an index of 0.0 represents high cost-low carbon footprint
          </label>
          <label
            htmlFor="visitors"
            className="my-0.5  block text-sm font-medium text-heading "
          >
            Choose the import city
          </label>
          <select
            id="countries"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity?.(e.target.value);
            }}
            className="block w-full border-black rounded-md border-1"
          >
            <option value="" disabled>
              Select a city
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </form>
        <button
          className="btn mt-3 btn-primary bg-gray-200"
          onClick={() => router.push("?query=clicked")}
        >
          Query
        </button>
      </div>
    </div>
  );
};

export default Input;
