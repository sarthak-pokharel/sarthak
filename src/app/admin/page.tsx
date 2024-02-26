"use client";

import { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import axios from "axios";
import { Backdrop, Button, Card, CardActionArea, CardContent, CircularProgress, IconButton, Switch, Typography } from "@mui/material";
import { FishNChips, TimeAgoComp } from "../trashdump/Dynamics";
import Link from "next/link";
import { Delete } from "@mui/icons-material";







async function getAllPostsAdmin(password){
    let postsreq = await axios.post("/api/gettrashdumpsadmin", {password});
    console.log(getAllPostsAdmin);
    if(postsreq.data.success){
        let j = postsreq.data.dat;
        j.sort(function(a,b){
            return b.date-a.date;
        });
        return j;
    }else {
        console.log(postsreq.data.error);
        return [];
    }
}





function CardBottom({ trash }) {
    let ttlCont = function(v){
        return (<>
        
        {v.content.title|| <>untitled card</>}
        
    </>);
    };
    console.log(trash,'w')
    return <CardContent sx={{ paddingTop: 0, paddingBottom: "0 !important" }}>
        <FishNChips trash={trash} />
        <Typography variant="body" color="text.secondary" sx={{ fontWeight: 'bold' }} component="div">
            {trash.content.link?<>
                <Link target="_blank" style={{color:"#0085ff", textDecoration:'none'}} href={trash.content.link} >{ttlCont(trash)}</Link>
            </>: ttlCont(trash)}
        </Typography>
        <TimeAgoComp trash={trash} />
    </CardContent>;
}

function TextOnly({ trash }) {
    // console.log(trash,'w');
    let proc_cont = trash.content.text.trim();
    // proc_cont = marked(trash.content.text);
    return <>
        <div style={{ display: 'flex', flexDirection: 'column', height: "100%", justifyContent: 'space-between' }}>

            <CardContent>
                <Typography

                    sx={{ "whiteSpace": "pre-wrap" }}
                >
                    <div>
                        {proc_cont}
                    </div>
                </Typography>
            </CardContent>
            <CardBottom trash={trash} />
        </div>
    </>
}

async function switchPostState(id, state, password){
    let fn = await axios.post('/api/togglepoststate',{id, state, password});
    return fn.data.success;
}
async function deletePost(id, password) {
    let fn = await axios.post("/api/deleteTrashPost", {id, password});
    return fn.data.success;
}

export default function admin(){
    let [password, setPassword] = useState("");
    let [posts_info, setPostsInfo] = useState([]);
    let [isLoading, setLoading] = useState(false);



    useEffect(function(){
        let lpass = localStorage.getItem("admin_pass");
        if(lpass) return setPassword(lpass);
        localStorage.setItem("admin_pass", prompt("Enter pass:"));
    },[]);
    useEffect(function(){
        if(!password) return;
        
        getAllPostsAdmin(password).then(posts=>setPostsInfo(posts));
    },[password]);
    let cardqe = (trash,i,isLoading, setLoading)=>{
        return (<Card
                    elevation={0}
                    sx={{ width: 300, textTransform: 'lowercase',
                          borderRadius: 6,
                          marginBottom:2,
                          padding: 1,
                          transition: "box-shadow 0.3s ease",
                        //   cursor: trash.content.link?'pointer':'auto',
                          boxShadow: "inset 0 0px 10px 0px #858585",
                          boxSizing:"border-box",
                          "&:hover":{
                            boxShadow: "none"
                          }
                          
                }} key={i}
                >
                    
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Switch checked={!trash.hidden} onClick={(async v=>{
                        setLoading(true);
                        if(!(await switchPostState(posts_info[i].id, !posts_info[i].hidden, password))){
                            return console.log("error");
                        }
                        posts_info[i].hidden = !posts_info[i].hidden;
                        setPostsInfo([...posts_info]);
                        setLoading(false);
                    })} />
                    <IconButton onClick={(async v=>{
                        setLoading(true);
                        if(!(await deletePost(posts_info[i].id, password))){
                            return console.log("error");
                        }
                        
                        posts_info.splice(i,1);
                        setPostsInfo([...posts_info]);
                        setLoading(false);
                    })}>
                        <Delete/>
                    </IconButton>
                    </div>
                    <TextOnly trash={trash} />
                </Card>)
    };
    
    return <>
    <Nav />
    <br/>
    <br/>
    <Backdrop sx={{zIndex:'99'}} open={isLoading}><CircularProgress/></Backdrop>
    <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: "wrap", marginBottom:30,alignItems:'center' }}>
    {posts_info.map((post,i)=>{
            console.log(post);
            return cardqe(post,i,isLoading, setLoading);
        })}
    </div>
    </>
}
