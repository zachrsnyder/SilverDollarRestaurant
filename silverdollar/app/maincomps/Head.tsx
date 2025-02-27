import Head from 'next/head'

const HeadMeta = () => {
  return (
    <Head>
        <title>Best Breakfast in Lake of the Ozarks | Silver Dollar&lsquo;s</title>
        <meta name="description" content="Discover the best breakfast, lunch, and dinner in Lake of the Ozarks! Fresh ingredients, cozy atmosphere, and delicious coffee." />
        <meta name="keywords" content="Lake of the Ozarks breakfast, best coffee, pancakes, brunch spot" />
        <meta name="author" content="Silver Dollar's" />
        <meta property="og:title" content="Best spot in Lake of the Ozarks" />
        <meta property="og:description" content="Experience a delicious breakfast, lunch, and dinner in Lake of the Ozarks." />
        <meta property="og:image" content="/images/FOG_Sunset.jpg" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"} />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Silver Dollar's",
                "image": process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL + "/images/logo.png" : "http://localhost:3000/images/logo.jpg",
                "telephone": "+1-573-392-3677",
                "servesCuisine": "Breakfast, Brunch, Lunch, Dinner",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "20 Acorn Dr",
                  "addressLocality": "Eldon",
                  "addressRegion": "Missouri",
                  "postalCode": "65026",
                  "addressCountry": "US"
                }
              })
            }}
        />
    </Head>
  )
}

export default HeadMeta