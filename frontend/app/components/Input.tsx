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
