import Head from 'next/head'
import Hero from '../components/Hero'



export default function Home() {
  return (
    <>
      <Head>
        <title>Slice3</title>
        <meta name="description" content="Created by Dinesh && Shikhar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/card3.png" />
      </Head>
      <section className='bg-black min-h-screen'> 
       <Hero/>
      </section>
      
    </>
  )
}
