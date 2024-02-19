"use client";
import { Chip, Typography } from "@mui/material";

import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
timeAgo.addDefaultLocale(en)


export function TimeAgoComp({ trash }) {
    let getLocTime = (()=>{let v = new Date(trash.date);return v.getHours().toString().padStart(2,'0')+":"+v.getMinutes().toString().padStart(2,'0')});
    const timeAgoParser = new timeAgo('en-US');
    return (<Typography 
        variant="caption" 
        color="text.secondary" 
        title={
            
            getLocTime(trash.date)
        } 
        sx={{ textAlign: 'right', padding: 0 }} 
        component="div"
    >{timeAgoParser.format(trash.date)} | {getLocTime(trash.date)}</Typography>)
}
export function FishNChips({trash}){
    return (<div style={{marginBottom:5, display:"flex", gap:4}}>
    {trash.labels.map((lab,i)=>{
        return <Chip key={i} label={lab} variant="outlined" size="small"
        
            sx={{cursor:'pointer', userSelect:'none'}}
            onClick={(e)=>e.preventDefault()}
        />
    })}
</div>)
}