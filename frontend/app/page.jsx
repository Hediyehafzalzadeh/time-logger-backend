import { Navbar } from "@/components/Navbar";
import  Logger from "@/components/Logger"
import { Toaster } from "@/components/ui/sonner"

export default async function Home() {
   


  return (
     <div className='main-h-screen'>
      <header>
         <div className="m-5 flex flex-row justify-end">
            <Navbar  />
            </div>
      </header>
        <Logger  />
        <Toaster />
     </div>
    
  );
}
