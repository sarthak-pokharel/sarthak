import Nav from "../Components/Nav";
import styles from './blogs.module.css'
import inf from '../../../[Blogs]/content.json';
import { Typography } from "@mui/material";
import VariableTimeDisplay from "./VariableTimeDisplay";




export default function Blogs() {
    return <>
        <Nav />

        <div className={styles.container}>
            {inf.blogs.map(blog => <>

                <div className="blog">
                    <VariableTimeDisplay blog={blog} />
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