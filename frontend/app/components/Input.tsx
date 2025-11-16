"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../slider.css";

const Input: React.FC<{
  selectedCity?: string;
  setSelectedCity?: (city: string) => void;
  setQueryResult?: (data: any) => void;
}> = ({ selectedCity = "", setSelectedCity, setQueryResult }) => {
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

  const [companyCosts, setCompanyCosts] = useState(0);
  const [co2emissions, setCo2emissions] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);

  const handleSubmit = async () => {
    const formData = {
      price_target: companyCosts,
      CO2_target: co2emissions * 100000,
      CO2_weight: ratio,
      Destination: city,
    };

    try {
      const response = await fetch("/api/steel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Full response:", result);

      if (
        result.detail ===
        "No countries satisfy the given targets. Please relax your targets and try again."
      ) {
        setErrorCount((prev) => prev + 1);
        setErrorMessage("No valid countries match your targets. Please adjust.");

        // Clear after 3 seconds
        setTimeout(() => setErrorMessage(null), 3000);
        return; // stop further execution
      } else {
        setErrorCount(0);
        setErrorMessage(null);
      }

      localStorage.setItem("steelData", JSON.stringify(result));
      if (setQueryResult) setQueryResult(result.best_country.Origin_port);

      router.push("?query=clicked");

      console.log("Best country:", result.best_country);
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="relative rounded-md flex flex-col w-60 h-130 py-2 p-3 border bg-base items-center">
      {/* Error overlay */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
          {errorMessage} {errorCount > 1 ? "(Repeated!)" : ""}
        </div>
      )}

      <h1 className="font-bold text-2xl">Inputs</h1>
      <div className="flex flex-col">
        <form className="max-w-sm space-y-4">
          <label className="text-sm font-medium text-heading">
            Target Steel Cost
          </label>
          <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body flex items-center">
            <span className="label-text my-auto">$</span>
            <input
              type="number"
              className="grow"
              placeholder="00.00"
              value={companyCosts}
              onChange={(e) => setCompanyCosts(Number(e.target.value))}
            />
            <span className="label-text my-auto">Per Ton</span>
          </div>

          <label className="text-sm font-medium text-heading">
            Target CO<sub>2</sub> Emissions
          </label>
          <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body flex items-center">
            <input
              type="number"
              className="grow"
              placeholder="00.00"
              value={co2emissions}
              onChange={(e) => setCo2emissions(Number(e.target.value))}
            />
            <span className="label-text my-auto">
              CO<sub>2</sub> Ton/Steel Ton
            </span>
          </div>

          <label className="my-0.5 block text-sm font-medium text-heading">
            CO<sub>2</sub>-Cost Tradeoff Ratio
          </label>
          <div className="flex flex-col border-black rounded-md border-1 rounded-base">
            <div className="price-range p-4">
              <span className="text-sm cursor-auto">Index </span>
              <span className="text-sm cursor-auto">{ratio}</span>
              <input
                className="w-full accent-black slider"
                type="range"
                value={ratio}
                min={0}
                max={1.0}
                step={0.01}
                onChange={(e) => setRatio(Number(e.target.value))}
              />
              <div className="-mt-2 flex w-full justify-between mt-1">
                <span className="text-sm text-gray-600">CO<sub>2</sub></span>
                <span className="text-sm text-gray-600">Cost</span>
              </div>
            </div>
          </div>

          <label className="mb-2 block text-sm text-gray-400 text-heading my-[-10px]">
            Note: an index of 1.0 represents low cost-high carbon footprint and
            an index of 0.0 represents high cost-low carbon footprint
          </label>

          <label className="my-0.5 block text-sm font-medium text-heading">
            Choose the import city
          </label>
          <select
            id="countries"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
          onClick={handleSubmit}
        >
          Query
        </button>
      </div>
    </div>
  );
};

export default Input;
