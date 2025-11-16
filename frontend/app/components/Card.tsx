"use client";
import React from "react";
import OverallCostPie from "./OverallCostPie";
import SourcesofCarbon from "./SourcesofCarbon";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { refresh } from "next/cache";

const Card = ({}) => {
  const searchParams = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setRefreshKey((prev) => prev + 1); // This forces re-render
    };

    window.addEventListener("steelDataUpdated", handleUpdate);
    return () => window.removeEventListener("steelDataUpdated", handleUpdate);
  }, []);

  const data = localStorage.getItem("steelData");
  console.log({ data });
  const backendData = data ? JSON.parse(data) : null;

  const isClicked = searchParams.get("query") === "clicked";

  const seaDistance = backendData?.best_country?.Sea_distance;
  const landDistance = backendData?.best_country?.Land_distance;
  const company1 = backendData?.best_country?.Companies?.[0];
  const company2 = backendData?.best_country?.Companies?.[1];
  const company3 = backendData?.best_country?.Companies?.[2];
  console.log(backendData?.best_country?.Companies?.[2]);
  const best = backendData?.best_country?.Origin;
  const countrylist = backendData?.[0];

  return (
    <div key={refreshKey}>
      {isClicked && backendData && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          suppressHydrationWarning={true}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="border-1 h-[%100] pt-15 pb-250 relative rounded-md">
            <div className="top-6 left-6 absolute text-3xl ">
              <h1> Recommended Country: {best} </h1>
            </div>
            <hr className="mt-5" />

            <div className="h-2/4 w-full absolute  flex  justify-between p-4">
              <div className="left-side flex flex-col justify-start pt-15 space-y-10 font-bold text-2xl px-5 mt-1">
                <div className="flex flex-col space-y-3">
                  <span className="text-2xl font-bold">Top Companies </span>
                  <span className="text-base text-gray-600 font-medium">
                    {company1}
                  </span>
                  <span className="text-base text-gray-600 font-medium">
                    {company2}
                  </span>
                  <span className="text-base text-gray-600 font-medium">
                    {company3}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">
                    Distance to location
                  </span>
                  <span className="text-base text-gray-600 font-medium">
                    Sea Distance: {seaDistance ? seaDistance.toFixed(2) : "N/A"}{" "}
                    Km
                  </span>
                  <span className="text-base text-gray-600 font-medium">
                    Land Distance:{" "}
                    {landDistance ? landDistance.toFixed(2) : "N/A"} Km
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">
                    Satisfactory Countries ($)
                  </span>
                  <span className="text-base text-gray-600 font-medium">
                    {countrylist}
                  </span>
                </div>
              </div>

              <div className="mt-15">
                <div className="flex px-25">
                  <OverallCostPie data={backendData} />
                  <div></div>
                  <SourcesofCarbon data={backendData} />
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
