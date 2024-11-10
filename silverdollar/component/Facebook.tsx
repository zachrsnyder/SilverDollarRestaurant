'use client'
import React, { useEffect } from 'react'

const Facebook = () => {
    
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
        fjs.parentNode?.insertBefore(js, fjs);
    }, []);
    //empty dependency array so it happens once and once only.
    
    return (
    <div className=''>
        <div id="fb-root" className=''>
        
        </div>
        <div className="fb-page shadow-[10px_15px_30px_-3px_rgba(0,0,0,.2)] rounded-full" data-href="https://www.facebook.com/Silver-Dollars-100063559273272/" data-tabs="timeline" data-width="300" data-height="400" data-small-header="true" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/Silver-Dollars-100063559273272/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Silver-Dollars-100063559273272/">Silver Dollars</a></blockquote></div>
    </div>
  )
}

export default Facebook