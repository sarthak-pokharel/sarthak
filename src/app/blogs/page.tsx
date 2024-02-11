import Nav from "../Components/Nav";
import styles from './blogs.module.css'
import inf from '../content.json'
export default function Blogs() {
    return <>
        <Nav />

        <div className={styles.container}>
            {inf.blogs.map(blog => <>

                <div className="blog">
                    <h2>{blog.title}</h2>
                    <p>{blog.short_description}</p>
                    <a href={blog.link} className="read-more">Read More</a>
                </div>
            </>)}
        </div>

    </>
}