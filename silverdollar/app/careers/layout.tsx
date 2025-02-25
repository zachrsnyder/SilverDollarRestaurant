import { Metadata } from 'next'
import NavBar from '../maincomps/NavBar'



/** CAREERS TODO
 * TODO: Implement correct loading.tsx and error.tsx to this directory. 
 * TODO: Implement individual posting modal. Modal layout.tsx + correct routing.
 * TODO: Gussy up!
 * 
 */


export const metadata: Metadata = {
  title: 'Careers | Silver Dollar',
  description: 'Join the team at The Silver Dollar in Eldon, MO!',
  openGraph: {
    title: 'Careers | Silver Dollar',
    description: 'Join the team at The Silver Dollar in Eldon, MO!',
    images: [{
      url: '@/public/images/logo.png',
      width: 1200,
      height: 630,
      alt: 'Silver Dollar Logo'
    }],
  },
  keywords: [
    "restaurant jobs Lake Ozark MO",
    "careers in Lake Ozark restaurants",
    "Lake Ozark MO restaurant careers",
    "Lake of the Ozarks hospitality jobs",
    "restaurant server jobs Lake Ozark",
    "chef positions Lake Ozark Missouri",
    "restaurant management jobs Lake Ozark",
    "Lake Ozark restaurant hiring",
    "restaurant job openings Lake Ozark",
    "Lake Ozark dining industry careers",
    "hospitality careers Lake of the Ozarks",
    "bartender jobs Lake Ozark Missouri",
    "food service jobs Lake Ozark MO",
    "Lake Ozark MO restaurant staff",
    "kitchen staff jobs Lake Ozark",
    "work at Lake Ozark restaurant",
    "Lake of the Ozarks restaurant employment",
    "waitstaff positions Lake Ozark MO",
    "Lake Ozark Missouri culinary jobs",
    "line cook jobs Lake Ozark"
  ],

}

export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <div>
      <NavBar/>
      {children}
    </div>
  )
}