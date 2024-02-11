import Link from "next/link";
import styles from './Nav.module.css'





export default function Nav(){
    return <>
    <nav className={styles.nav}>
        <Link className={styles.navroute} href="/">home</Link>
        <Link className={styles.navroute} href="/blogs">blogs</Link>
        <Link className={styles.navroute} href="/games">games</Link>
        <Link className={styles.navroute} href="/contact">contact</Link>
    </nav>
    </>
}