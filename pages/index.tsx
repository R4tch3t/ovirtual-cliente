import type { NextPage } from 'next'
import AppLinker  from '../router/AppLinker'
import React from 'react'
import Head from 'next/head'

const Home: NextPage = () => {
  
  return(
    <>
    <Head>
      <title>Ovirtual - Inicio</title>
    </Head>
      <AppLinker  />
    </>
  )

}

export default Home
