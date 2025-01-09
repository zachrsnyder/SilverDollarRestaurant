import Image from "next/image";
import Facebook from "../component/Facebook";
import FoodCard from "../component/SmallCard";
import SmallCard from "../component/SmallCard";
import MenuesSection from "@/component/menuesSection";
import ResponsiveGalley from "@/component/ResponsiveGallery";
import RandomGallery from "@/component/RandomGallery";
import RandGallWrapper from "@/component/RandGallWrapper";
import { getMenu } from "@/lib/util/getMenu";


export default async function Home() {
  const menuUrls = await getMenu();
  return (
    <div className='pt-24'>
      
      <MenuesSection menuUrls={menuUrls}/>

      <RandGallWrapper />

    </div>
  );
}
