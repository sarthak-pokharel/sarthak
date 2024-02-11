import Nav from "../Components/Nav";
import styles from './blogs.module.css'
import inf from '../content.json'
export default function Blogs() {
    return <>
        <Nav />

        <div className={styles.container}>
            {inf.blogs.map(blog => <>

                <div className="blog">
                    <h2 style={{textTransform:'lowercase'}}>{blog.title}</h2>
                    <p>{blog.short_description}</p>
                    <a href={blog.link} target="_blank" className="read-more">read</a>
                </div>
            </>)}
        </div>

    </>
}