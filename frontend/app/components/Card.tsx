"use client";
import React from "react";
import OverallCostPie from "./OverallCostPie";
import SourcesofCarbon from "./SourcesofCarbon";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRouter} from "next/router";
const Card = () => {
  
  const co2 = "co2";
  const methane = "methane";
  const time = "tikme";
  const cost = "cost";

  const route = "Route";

  const searchParams = useSearchParams();
  const isClicked = searchParams.get("query") === "clicked";
  return (
    <div>
      {isClicked && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="border-1 h-[%100] pt-15 pb-250 relative rounded-md">
            <div className="top-6 left-6 absolute text-3xl ">
              <h1> Recommended Route: {route} </h1>
            </div>
            <hr className="mt-5" />

            <div className="h-2/4 w-full absolute  flex  justify-between p-4">
              <div className="left-side flex flex-col justify-start pt-15 space-y-10 font-bold text-2xl px-5 mt-1">
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">CO2 Pollution</span>
                  <span className="text-base text-gray-600 font-medium">
                    {co2}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">Amount of Methane</span>
                  <span className="text-base text-gray-600 font-medium">
                    {methane}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">Time to location</span>
                  <span className="text-base text-gray-600 font-medium">
                    {time}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">Total Cost ($)</span>
                  <span className="text-base text-gray-600 font-medium">
                    {cost}
                  </span>
                </div>
              </div>

              <div className="mt-15">
                <div className="flex px-25">
                  <OverallCostPie />
                  <div></div>
                  <SourcesofCarbon />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Card;
