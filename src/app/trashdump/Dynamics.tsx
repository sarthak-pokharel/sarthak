"use client";
import { Chip, Typography } from "@mui/material";

import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
timeAgo.addDefaultLocale(en)


export function TimeAgoComp({ trash }) {
    let getLocTime = (()=>{let v = new Date(trash.date).toLocaleTimeString().split(" ");return v[0].split(":").slice(0,2).join(":")+" "+v[1]; });
    const timeAgoParser = new timeAgo('en-US');
    return (<Typography 
        variant="caption" 
        color="text.secondary" 
        title={
            
            getLocTime()
        } 
        sx={{ textAlign: 'right', padding: 0 }} 
        component="div"
    >{timeAgoParser.format(trash.date)} | {getLocTime()}</Typography>)
}
export function FishNChips({trash}){
    return (<div style={{marginBottom:5, display:"flex", gap:4}}>
    {trash.labels.map((lab,i)=>{
        return <Chip key={i} label={lab} variant="outlined" size="small"
        
            sx={{cursor:'pointer', userSelect:'none'}}
            onClick={()=>0}
        />
    })}
</div>)
}