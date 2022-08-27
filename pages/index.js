import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import ScaleCalculator from '../components/ScaleCalculator'
import ScaleFactor from '../components/scaleFactor'
import { useEffect, useState, useRef } from 'react'

export default function Home() {

  const [scaledLength, setScaledLength] = useState(34)
  const [realLength, setRealLength] = useState(0)
  const [hasMounted, setHasMounted] = useState(false);
  
  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // if (!hasMounted) {
  //   return null;
  // }


  return (
    <div className={styles.container}>
      <Head>
        <title>ARChTools</title>
        <meta name="description" content="Architecture Widgets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ScaleCalculator/>
         {/* <ScaleFactor 
      realLength={!realLength ? "" : realLength}
      setRealLength={setRealLength}
      scaledLength={!scaledLength ? "" : scaledLength}
      setScaledLength={setScaledLength}

       /> */}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
