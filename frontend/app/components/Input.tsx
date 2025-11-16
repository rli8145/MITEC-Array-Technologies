'use client';
import React, { useEffect, useState } from 'react'
import PriceRange from './slider';
<<<<<<< HEAD
import { useState } from "react";
import { useRouter } from 'next/navigation';
const Input = () => {
  const steelTypes = [
    {
      id: 1,
      name: "GreenSteel",
    },
  ];

  const router = useRouter();
  const [companyCosts, setCompanyCosts] = useState(0);
  const [co2emissions, setCo2emissions] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [city, setCity] = useState("")


  const handleClicked = () => {
    router.push('?query=clicked')
    handleSubmit()
  }
  
  

  /*  api pushing stuff*/


    const handleSubmit = async () => {
      const formData = {
        company_cost: companyCosts,
        co2_emissions: co2emissions,
        cost_co2_ratio: ratio,
        target_city: city
      };
      try {
        const response = await fetch("api route", 
          {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
          }
        )
        const result = await response.json();
        
      } catch (err: any){
        console.log(err)
      }
    }



 
  return (
    <div className='flex flex-col w-60 h-130 py-5 p-3 border bg-base items-center'>
      <h1 className='font-bold text-2xl'>Inputs</h1>
      <div className='flex flex-col'>
=======

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
  { id: 26, name: "Albuquerque" }
];

const Input: React.FC<{ selectedPoint?: string; onSelectCity?: (city: string) => void }> = ({ selectedPoint, onSelectCity }) => {
    const [selectedCity, setSelectedCity] = useState( selectedPoint ?? "" ); 

    useEffect(() => {
      if (selectedPoint) setSelectedCity(selectedPoint);
    }, [selectedPoint]);
>>>>>>> parent of 205ff43 (Merge pull request #5 from rli8145/frontend)
    
"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
const Input = () => {
  const steelTypes = [
    {
      id: 1,
      name: "GreenSteel",
    },
  ];
  
  const router = useRouter();
 
  return (
    <div className="flex flex-col w-60 h-90 py-5 inset-shadow-sm items-center">
      <h1 className="font-bold text-2xl">Inputs</h1>
      <div className="flex flex-col">
        <form className="max-w-sm  space-y-4">
          <label
            htmlFor="visitors"
            className="text-sm font-medium text-heading"
<<<<<<< HEAD
             
=======
>>>>>>> parent of 205ff43 (Merge pull request #5 from rli8145/frontend)
          >
            Target Steel Cost
          </label>
          <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body">
            <span className="label-text my-auto">$</span>
            <input
              type="number"
              className="grow"
              placeholder="00.00"
<<<<<<< HEAD
              id="trailingAndLeadingInput1"
              onChange={(e) => setCompanyCosts(Number(e.target.value))}

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
              id="trailingAndLeadingInput2"
              onChange={(e) => setCo2emissions(Number(e.target.value))}
            />
            <span className="label-text my-auto">Kg/Steel Ton</span>
          </div>
          <div>
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              CO<sub>2</sub> Cost Tradeoff Ratio
            </label>
            <input
              type="text"
              id="visitors"
              className="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-1 shadow-xs placeholder:text-body"
              placeholder=""
              required
            />
          </div>
        </form>
        <button
          className="btn mt-3 btn-primary bg-gray-200"
          onClick={handleClicked}
        >
          Query
        </button>
        
        onChange={(e) => { setSelectedCity?.(e.target.value); }}
        className="block w-full border-black rounded-md border-1">
          <option value="" disabled>Select a city</option>
          {cities.map((city) => (
          <option key={city.id} value={city.name}>{city.name}</option>))}
      </select>
=======
              id="trailingAndLeadingInput"
            />
            <span className="label-text my-auto">Per Ton</span>
          </div>
>>>>>>> parent of 205ff43 (Merge pull request #5 from rli8145/frontend)

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
              id="trailingAndLeadingInput2"
            />
            <span className="label-text my-auto">Kg/Steel Ton</span>
          </div>
          <div>
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              CO<sub>2</sub> Cost Tradeoff Ratio
            </label>
            <input
              type="text"
              id="visitors"
              className="rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-1 shadow-xs placeholder:text-body"
              placeholder=""
              required
            />
          </div>
        </form>
        <button
          className="btn mt-3 btn-primary bg-gray-200"
          onClick={() => router.push('?query=clicked')}
        >
          Query
        </button>
        
      </div>
    
    </div>
  );
};

export default Input;
