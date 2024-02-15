"use client";
import { Typography } from "@mui/material";

import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
timeAgo.addDefaultLocale(en)


export function TimeAgoComp({ trash }) {
    const timeAgoParser = new timeAgo('en-US');
    return (<Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right', padding: 0 }} component="div"
    >{timeAgoParser.format(trash.date)}</Typography>)
}
