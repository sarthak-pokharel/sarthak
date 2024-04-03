import Nav from "../Components/Nav";
import styles from './blogs.module.css'
import inf from '../../../[Blogs]/content.json';
import { Box, Typography } from "@mui/material";
import VariableTimeDisplay from "./VariableTimeDisplay";




export default function Blogs() {
    return <>
        <Nav />


        {inf.blogs.map(blog => <>
            <div className={styles.container}>
                <div className="blog">
                    <Typography sx={{ textTransform: 'lowercase', display:'flex', justifyContent:'space-between' }} variant="h5">
                    <Box>{blog.title}</Box>
                    <Box><VariableTimeDisplay blog={blog} /></Box>
                    </Typography>
                    <Typography>{blog.short_description}</Typography>
                    <br />
                    <div>
                        <a href={blog.link} target="_blank" className="read-more">read</a>
                    </div>
                </div>
            </div>
        </>)}


    </>
}