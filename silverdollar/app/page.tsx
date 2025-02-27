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
