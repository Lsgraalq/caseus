import React from 'react'

const FooterDE = () => {
  return (
    <>
    <div className="mb-[110vh] bg-[#0500FF]"></div>
    
      <div className="bg-[#0500FF] h-screen flex flex-col w-screen px-3 text-white fixed bottom-0 md:px-10">
        
        {/* Footer Heading */}
        <div className="pt-30 md:pt-10 text-[45px] leading-12 2xl:text-[140px] 2xl:leading-40 xl md:text-[60px] xl:text-[100px] xl:leading-20">
          {"\t"}Wir glauben an <br />den Menschen und <br />die Kraft des Guten
        </div>
        
        {/* Footer Contacts & Links */}
        <div className="pt-15 flex flex-col gap-10">
          
          <div className="flex flex-col gap-2">
            <p className="text-lg apercu-bold md:text-2xl">Hast du ein Projekt?</p>
            <a href="mailto:caseusdigitalagency@gmail.com" className="text-sm apercu-thin md:text-xl underline">
              caseusdigitalagency@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col gap-1 md:gap-5">
            <p className="text-lg apercu-bold md:text-2xl">Folge uns:</p>
            <div className="flex flex-row gap-2">
              <a href="https://www.instagram.com/caseus.studio/" className="text-lg apercu-thin md:text-2xl underline">Instagram</a>
              <a href="https://www.youtube.com/@Caseus.studio" className="text-lg apercu-thin md:text-2xl underline">YouTube</a>
              <a href="https://www.tiktok.com/@caseus.studio" className="text-lg apercu-thin md:text-2xl underline">TikTok</a>
            </div>
          </div>
          
          {/* Footer Bottom Bar */}
          <div className="flex flex-row">
            <div className="flex flex-row gap-5 w-full">
              <p className='text-sm md:text-xl'>Caseus ©2026</p> 
              <a href="/impressum" className="text-sm apercu-thin md:text-xl underline">Impressum</a>
            </div>
            
            <div className="flex-row gap-1 md:flex hidden">
              <a href="/en" className="apercu-thin hover:underline">EN</a>
              /
              <div className="apercu-bold underline">DE</div>
            </div>
          </div>

        </div>
        <div></div>
      </div>
      </>
  )
}

export default FooterDE