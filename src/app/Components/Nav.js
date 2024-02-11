import Link from "next/link";
import styles from './Nav.module.css'





export default function Nav(){
    return <>
    <nav className={styles.nav}>
        <Link className={styles.navroute} href="/">home</Link>
        <Link className={styles.navroute} href="/blogs">blogs</Link>
        <Link className={styles.navroute} href="/trashdump">trash-dump</Link>
        <Link className={styles.navroute} target="_blank" href="https://prof.sarthakpokhrel.com.np">professional</Link>
    </nav>
    </>
}