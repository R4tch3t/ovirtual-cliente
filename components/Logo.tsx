import { urlLogo, urlHeaderLogo, urlLogoDae, urlPDFLogo } from "../variables/images"
import Image from 'next/image'

export const PDFLogo = ({width,height}:any) => {
  return (
    <Image 
      width={width}
      height={height}
      placeholder='blur' 
      blurDataURL={urlPDFLogo}
      src={urlPDFLogo}
      alt="headerLogo"
    />
  )
}

export const HeaderLogo = ({width,height}:any) => {
  return (
    <Image 
      width={width}
      height={height}
      placeholder='blur' 
      blurDataURL={urlHeaderLogo}
      src={urlHeaderLogo}
      alt="headerLogo"
    />
  )
}

export const LogoDae = ({width,height}:any) => {
  return (
    <div className="w-full wMid" >
      <Image 
        width={width}
        height={height}
        placeholder='blur' 
        blurDataURL={urlLogoDae}
        src={urlLogoDae}
        alt="headerLogo"
      />
    </div>
  )
}

const Logo = ({width,height}:any) => {
    return (
        <div className="logoUAG">
              <Image
                width={width}
                height={height}              
                placeholder='blur' 
                blurDataURL={urlLogo}
                src={urlLogo}
                alt="UAGro."
              />
        </div>
    )
}

export default Logo