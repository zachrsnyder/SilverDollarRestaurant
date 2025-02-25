'use client'
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react'

const Facebook = () => {
  const [loading, setLoading] = useState(true)
    
      //occurs on mount of the object to the DOM
    useEffect(() => {
        // Load the Facebook SDK
        const d = document;
        const s = 'script';
        const id = 'facebook-jssdk';
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;

        //has to be type casted to a Script Element so the existence of a src property is known.
        const js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0";
        js.onload = () => setLoading(false);
        fjs.parentNode?.insertBefore(js, fjs);
    }, []);
    //empty dependency array so it happens once and once only.
    
    return (
    <div className=''>
        <div id="fb-root" className='flex justify-center align-middle'>
        
        </div>
        <div className='flex justify-center align-middle'>
          {loading ? 
            <Skeleton variant="rectangular" width={400} height={500}/>
            :
            <div className="fb-page rounded-full w-[400px] h-[500px] flex justify-center align-middle" data-href="https://www.facebook.com/Silver-Dollars-100063559273272/" data-tabs="timeline" data-width="400" data-height="500" data-small-header="true" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/Silver-Dollars-100063559273272/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Silver-Dollars-100063559273272/"></a></blockquote></div>
          }
        </div>
       
    </div>
  )
}

export default Facebook