import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
// const Map = dynamic(() => import("./components/Map"), { ssr: false });
import Map from "./components/Map";
import YWAMChurches from "../data/ywam/ywam-cleanedchurchdata.json";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SF Church map</h1>

        <p className={styles.description}>
          Mapping out churches and related data for the city of San Francisco
        </p>
        <div>
          <Map churches={YWAMChurches} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://www.basiltech.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src="/images/basil-logo.svg"
            alt="Basil Tech Logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  );
}
