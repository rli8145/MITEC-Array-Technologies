'use client';
import React from 'react'
import PriceRange from './slider';
import { useState } from "react";



const Input = () => {
    const [selectedCity, setSelectedCity] = useState(""); 
    const cities = [
  "Los Angeles",
  "Chicago",
  "New York",
  "Dallas",
  "Houston",
  "Detroit",
  "Minneapolis",
  "Boston",
  "Seattle",
  "Philadelphia",
  "San Jose",
  "Atlanta",
  "San Francisco",
  "Cleveland",
  "Portland",
  "Milwaukee",
  "Phoenix",
  "St. Louis",
  "Cincinnati",
  "San Diego",
  "Grand Rapids",
  "Indianapolis",
  "Pittsburgh",
  "Kansas City",
  "Memphis",
  "Albuquerque"
];


  return (
    <div className='flex flex-col w-60 h-130 py-5 p-3 border bg-base items-center'>
      <h1 className='font-bold text-2xl'>Inputs</h1>
      <div className='flex flex-col'>
    
        <form className="max-w-sm  space-y-4">
            <label htmlFor="visitors" className="text-sm font-medium text-heading">Target Steel Cost</label>
            <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body">
                <span className="label-text my-auto">$</span>
                <input type="number" className="grow" placeholder="00.00" id="trailingAndLeadingInput" />
                <span className="label-text my-auto">Per Ton</span>
            </div>

           <label htmlFor="visitors" className="text-sm font-medium text-heading">Target CO<sub>2</sub> Emissions</label>
            <div className="input rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body">
                <span className="label-text my-auto">$</span>
                <input type="number" className="grow" placeholder="00.00" id="trailingAndLeadingInput" />
                <span className="label-text my-auto">Kg/Steel Ton</span>
            </div>
            <label htmlFor="visitors" className="my-0.5  block text-sm font-medium text-heading ">CO<sub>2</sub>-Cost Tradeoff Ratio</label>
            <div className='flex flex-col border-black rounded-md  border-1 rounded-base'>
             <PriceRange />
            </div>
            <label htmlFor="visitors" className="mb-2 block text-sm text-gray-400 text-heading my-[-10px]">Note: an index of 1.0 represents low cost-high carbon footprint and an index of 0.0 represents high cost-low carbon footprint</label>
            <label htmlFor="visitors" className="my-0.5  block text-sm font-medium text-heading ">Choose the import city</label>
            <select
        id="countries"
        value={selectedCity} 
        onChange={(e) => setSelectedCity(e.target.value)}
        className="block w-full border-black rounded-md border-1">
          {cities.map((city) => (
          <option value={city}>{city}</option>))}
      </select>

        </form>
        <h1 className='btn mt-3 btn-primary bg-gray-200'>Query</h1>
      </div>
    
    </div>

  )
}

export default Input
