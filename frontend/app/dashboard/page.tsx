'use client'
import Image from "next/image";
import Sidemenu from "../components/sidemenu";
import Input from "../components/Input";
import Greetings from "../components/Greetings";
import Map from "../components/Map";
import Card from "../components/Card";
import { useState } from "react";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("");
    const [queryResult, setQueryResult] = useState(null);


  return (
    <div className="flex gap-10 py-5 px-7 bg-base-100" suppressHydrationWarning={true}>
      <Sidemenu />
      <div className="flex flex-col gap-2 flex-1">
        <Greetings />
        <div className="flex flex-row gap-2">
          <>
          <Input selectedCity={selectedCity} setSelectedCity={setSelectedCity} setQueryResult={setQueryResult}/>
          <Map selectedCity={selectedCity} queryResult={queryResult}/>
          </>
        </div>

        <Card/>
      </div>
    </div>
  );
}