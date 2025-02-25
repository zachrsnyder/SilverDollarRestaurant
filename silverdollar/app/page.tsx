import Image from "next/image";
import Facebook from "../components/Facebook";
import FoodCard from "../components/SmallCard";
import SmallCard from "../components/SmallCard";
import MenuesSection from "@/components/menuesSection";
import ResponsiveGalley from "@/components/ResponsiveGallery";
import RandomGallery from "@/components/RandomGallery";
import RandGallWrapper from "@/components/RandGallWrapper";
import { getMenu } from "@/lib/util/getMenu";
import OptMenuSection from "@/components/OptMenuSection";
import Main from "@/components/Main";
import FBWrapper from "@/components/FBWrapper";
import AltNavBar from "./maincomps/AltNavBar";


export default async function Home() {
  const menuUrls = await getMenu();
  return (
    <div className=''>
      <AltNavBar menuUrls={menuUrls}/>
      <Main/>

      <FBWrapper/>
      
      <OptMenuSection menuUrls={menuUrls}/>

      <RandGallWrapper />

    </div>
  );
}
