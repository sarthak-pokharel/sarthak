"use client";

import { Typography } from "@mui/material";


import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
timeAgo.addDefaultLocale(en)
const timeAgoParser = new timeAgo('en-US');

export default function VariableTimeDisplay({blog}) {
    return <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }} >{timeAgoParser.format(blog.published_date)}</Typography>;
}