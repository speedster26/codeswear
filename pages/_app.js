import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>

    <Head>
      <title>Rushital.com - Your everyday effortless style</title>
      <meta name="description" content="Rushital.com - Your everyday effortless style" />
      <link rel="icon" href="/logo1.png" />
    </Head>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </>
}

export default MyApp
