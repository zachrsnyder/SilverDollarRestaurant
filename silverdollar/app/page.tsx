import Image from "next/image";
import Facebook from "../component/Facebook";
import FoodCard from "../component/SmallCard";
import SmallCard from "../component/SmallCard";
import MenuesSection from "@/component/menuesSection";
import ResponsiveGalley from "@/component/ResponsiveGallery";
import RandomGallery from "@/component/RandomGallery";
import RandGallWrapper from "@/component/RandGallWrapper";

export default function Home() {
  return (
    <div className='pt-24'>
      
      <MenuesSection/>

      <RandGallWrapper />

    </div>
  );
}
