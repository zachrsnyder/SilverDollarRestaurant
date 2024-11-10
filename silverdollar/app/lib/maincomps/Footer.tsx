import MapClientContainer from "@/app/component/MapClientContainer";
import {Phone, Mail, Building2} from 'lucide-react'
import Hours from '@/app/component/Hours'
import Link from "next/link";



export default function Footer() {  
  return (
    <footer className="bg-gray-700 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className='flex flex-wrap w-full gap-4'>
          <div className='flex flex-col my-4 flex-1 basis-[250px] max-w-[450px] h-[300px] justify-center'>
            <div className='py-2 pl-3'>
              <h1 className='text-2xl font-arvo font-bold'>SILVER DOLLAR</h1>
            </div>
            <div className='container h-full flex flex-col text-gray-300'>
              <div className='flex items-center gap-2 pl-5'>
                <Phone />
                <span className='text-base'>(573) 392-3677</span>
              </div>
              <div className='flex items-center gap-2 pl-5'>
                <Mail/>
                <span className='text-base'> Fill with email </span>
              </div>
              <div className='flex items-center gap-2 pl-5'>
                <Building2 />
                <span className='text-base'>20 Acorn Dr, Eldon, MO 65026</span>
              </div>
              <Hours/>
            </div>
          </div>

          <div className='flex-1 basis-[250px] h-[300px] justify-center'>
            <div className='py-3 pl-3'>
              <h1 className='text-xl font-arvo font-bold'>SITEMAP</h1>
            </div>
            <div className='container h-full flex flex-col text-gray-300'>
              <div className='flex items-center gap-2 pl-5'>
                <Link href=''><p className='text-lg hover:text-red-800'>Home</p></Link>
              </div>
              <div className='flex items-center gap-2 pl-5'>
                <Link href=''><p className='text-lg hover:text-red-800'>Menu</p></Link>
              </div>
              <div className='flex items-center gap-2 pl-5'>
                <Link href=''><p className='text-lg hover:text-red-800'>Contact</p></Link>
              </div>
              <div className='flex items-center gap-2 pl-5'>
                <Link href=''><p className='text-lg hover:text-red-800'>Careers</p></Link>
              </div>
            </div>
          </div>

          <div className='flex-1 basis-[250px] h-[300px]'>
            <MapClientContainer />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Silver Dollar. All rights reserved.</p>
        </div>
      </div>
    </footer>
    );
  }