import Link from "next/link";
import styles from './Nav.module.css'
import { defFont } from "../trashdump/page";





export default function Nav(){
    return <>
    <nav className={styles.nav} style={{fontFamily:defFont}}>
        <Link className={styles.navroute} href="/">home</Link>
        <Link className={styles.navroute} href="/blogs">blogs</Link>
        <Link target="_blank" className={styles.navroute} href="/trashdump">trash-dump</Link>
        <Link className={styles.navroute} target="_blank" href="https://prof.sarthakpokhrel.com.np">professional</Link>
    </nav>
    </>
}

