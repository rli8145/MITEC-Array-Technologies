import Image from "next/image";
import Sidemenu from "../components/sidemenu";
import Input from "../components/Input";
import Greetings from "../components/Greetings";
import Map from "../components/Map";
import { printDummy } from "../../../filter"

export default function Home() {
  return (
    <div className='flex gap-10 py-15 px-7 min-h-screen'>
      <Sidemenu />
      <div className='flex flex-col gap-2 flex-1'>
        <Greetings />
        <div className='flex flex-row gap-2'>
        <Input />
        <Map />
        </div>
 
      </div>
    </div>
  );
}
