import Nav from "../Components/Nav";
import styles from './blogs.module.css'
import inf from '../../../[Blogs]/content.json';



import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Typography } from "@mui/material";
timeAgo.addDefaultLocale(en)
const timeAgoParser = new timeAgo('en-US');


export default function Blogs() {
    return <>
        <Nav />

        <div className={styles.container}>
            {inf.blogs.map(blog => <>

                <div className="blog">
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }} >{timeAgoParser.format(blog.published_date)}</Typography>
                    <Typography sx={{ textTransform: 'lowercase' }} variant="h5">{blog.title}</Typography>
                    <Typography>{blog.short_description}</Typography>
                    <br />
                    <div>
                        <a href={blog.link} target="_blank" className="read-more">read</a>
                    </div>
                </div>
            </>)}
        </div>

    </>
}