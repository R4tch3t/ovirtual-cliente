import { urlLogo, urlHeaderLogo, urlLogoDae, urlPDFLogo } from "../variables/images"
import Image from 'next/image'

export const PDFLogo = ({width,height}:any) => {
  return (
    <Image 
      width={width}
      height={height}
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
                src={urlLogo}
                alt="UAGro."
              />
        </div>
    )
}

export default Logo