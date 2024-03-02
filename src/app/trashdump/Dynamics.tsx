"use client";
import { Backdrop, Button, Card, CardActionArea, CardActions, CardContent, Chip, CircularProgress, Dialog, Typography } from "@mui/material";

import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useEffect, useState } from "react";
import { defFont } from "./page";
timeAgo.addDefaultLocale(en)



export function TimeAgoComp({ trash }) {
    let getLocTime = (() => { let v = new Date(trash.date); return v.getHours().toString().padStart(2, '0') + ":" + v.getMinutes().toString().padStart(2, '0') });
    const timeAgoParser = new timeAgo('en-US');
    return (<Typography
        variant="caption"
        color="text.secondary"
        title={

            new Date(trash.date).toString()
        }
        sx={{
            textAlign: 'right', padding: 0,
            fontFamily: defFont
        }}
        component="div"
    >{timeAgoParser.format(trash.date)} | {getLocTime(trash.date)}</Typography>)
}
export function FishNChips({ trash }) {
    return (<div style={{ marginBottom: 5, display: "flex", gap: 4, flexWrap: 'wrap' }}>
        {trash.labels.map((lab, i) => {
            return <Chip key={i} label={lab} variant="outlined" size="small"

                sx={{
                    cursor: 'pointer', color: "#414141", borderColor: "#414141", userSelect: 'none',
                    fontFamily: defFont
                }}
                onClick={(e) => e.preventDefault()}
            />
        })}
    </div>)
}




export function ReadMoreBtn({ trash }) {
    let [showDialog, setShowDialog] = useState(false);
    return !trash.content.link ? <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: "90%", margin: "auto", marginBottom: 7 }}>
            <Button
                sx={{
                    color: "#555",
                    borderColor: "#555",
                    "&:hover": {
                        borderColor: "#777"
                    },

                }}
                variant="outlined" onClick={e => setShowDialog(true)}>READ MORE</Button>
        </div>
        <ShowMoreBackDrop trash={trash} display={showDialog} setDisplay={setShowDialog} />
    </> : <></>;
}
function ShowMoreBackDrop({ trash, display, setDisplay }) {
    let proc_cont = trash.content.text.trim();

    return <>
        <Backdrop open={display} sx={{ zIndex: "99" }} onClose={(e, r) => r == "backdropClick" ? "" : ""}>
            <Card sx={{ width: 500, maxWidth: "90%" }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {trash.content.title}
                    </Typography>
                    <br />
                    <Typography

                        sx={{ "whiteSpace": "pre-wrap" }}
                    >
                        <div>
                            {proc_cont}
                        </div>
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: "flex-end" }}>
                    <Button variant="outlined" onClick={e => setDisplay(false)}>Close</Button>
                </CardActions>
            </Card>
        </Backdrop>
    </>
}