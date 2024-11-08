import MapClientContainer from "@/app/component/MapClientContainer";



export default function Footer() {

  
    return (
      <footer className="bg-gray-500 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className='container flex'>
            <div className='flex container w-2/3 bg-green-500'>

            </div>
            <MapClientContainer/>
          </div>
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Silver Dollar. All rights reserved.</p>
          </div>
          
        </div>
      </footer>
    );
  }