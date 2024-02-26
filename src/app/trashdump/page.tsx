import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { Link as MLink } from "@mui/material";
import Nav from "../Components/Nav";
import trashtree from '../../../[TrashDump]/trashtree.json';
import { AppProps } from 'next/app';
import { marked } from "marked";
import './page.css'
import fecha from 'fecha';
import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FishNChips, ReadMoreBtn, TimeAgoComp } from "./Dynamics";
import Link from "next/link";
import { useRef } from "react";
timeAgo.addDefaultLocale(en)


trashtree.reverse();

export let defFont = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

async function fetchTrashDumps() {
    let j = await (await fetch(process.env.URL + '/api/gettrashdumps', {
        // next: { revalidate: (3600/60)*15 },
        cache: 'no-store'
    })).text();

    // console.log("thisiswhatigot",[j])
    try {
        j = JSON.parse(j);
    } catch {
        j = [];
    }
    // console.log(j,j.length);
    // console.log(j);
    // let j = []
    console.log(j);
    j.sort(function (a, b) {
        return b.date - a.date;
    });

    return j;
};

function TCard({ trash }) {
    if (trash.content.imgs.length == 1) {
        return <ClassicTCard trash={trash} />
    }
    if (!trash.title) {
        return <TextOnly trash={trash} />
    }
}

function ClassicTCard({ trash }) {
    return (<>

        <div style={{ display: 'flex', flexDirection: 'column', height: "100%", justifyContent: 'space-between' }}>
            <div>
                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    {trash.content.imgs[0] ?

                        <CardMedia
                            component="img"
                            image={"https://sarthak-pokharel.github.io/sarthak/[TrashDump]/trashcan.jpg"}
                            sx={{ maxHeight: 200, maxWidth: 200 }}
                            title={trash.content.title}
                        /> :

                        ""}
                </div>
                <CardContent>
                    {trash.content.text ? <Typography sx={{ "whiteSpace": "pre-warp" }}>
                        {trash.content.text}
                    </Typography> : ""}


                </CardContent>
            </div>
            <div>
                <CardBottom trash={trash} />
            </div>
        </div>



    </>);
}
function CardBottom({ trash }) {

    let ttlCont = function (v) {
        return (<>

            {v.content.title || <>untitled card</>}

        </>);
    };
    console.log(trash, 'w')
    return <CardContent sx={{ paddingTop: 0, paddingBottom: "0 !important",fontFamily:defFont }}>
        <FishNChips trash={trash} />
        <Typography variant="body" color="#414141" sx={{ fontWeight: 'bold' }} component="div">
            {trash.content.link ? <>
                <Link target="_blank" style={{ color: "#0085ff", textDecoration: 'none' }} href={trash.content.link} >{ttlCont(trash)}</Link>
            </> : ttlCont(trash)}
        </Typography>
        <TimeAgoComp trash={trash} />
    </CardContent>;
}



function TextOnly({ trash }) {
    let proc_cont = trash.content.text.trim();
    let proc_cont_len = proc_cont.length;
    let char_max_lim = 120;
    // proc_cont = marked(trash.content.text);
    return <>
        <div style={{ display: 'flex', 
        flexDirection: 'column', 
        height: "100%", 
        justifyContent: 'space-between', 
        color: "#414141" }}>

            <CardContent>
                <Typography

                    sx={{ 
                        whiteSpace: "pre-wrap", 
                        fontFamily:defFont 
                    }}
                >
                    <div style={{ fontSize: (proc_cont_len > char_max_lim && trash.content.link) ? "0.85em" : "1em" }}>
                        {trash.content.link?<>{proc_cont}</>:<>
                            {proc_cont.slice(0, char_max_lim)}{proc_cont_len > 200 ? "..." : ""}
                        </>}
                    </div>
                </Typography>
            </CardContent>

            {proc_cont_len > 200 ? <ReadMoreBtn trash={trash} /> : ""}

            <CardBottom trash={trash} />
        </div>
    </>
}

function convertToKathmanduDate(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Specify the Kathmandu timezone
    const options = { timeZone: 'Asia/Kathmandu', hour12: false };

    // Format the date and time according to Kathmandu's local time
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        ...options,
        year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(date);

    return formattedDate;
}


export default async function trashdump() {

    let _ttr = await fetchTrashDumps();

    let tmap = {};
    _ttr.forEach(val => {
        let isod = convertToKathmanduDate(val.date);
        if (!tmap[isod]) {
            tmap[isod] = [];
        }
        tmap[isod].push(val);
    });
    let cardqe = (trash, i) => {
        return (<Card
            elevation={0}
            sx={{
                width: 300, textTransform: 'lowercase',
                borderRadius: 6,
                marginBottom: 2,
                padding: 1,
                transition: "box-shadow 0.3s ease",
                cursor: trash.content.link ? 'pointer' : 'default',
                background:"#0000",
                border:"1px solid #797979",
                // boxShadow: "inset 0 0px 10px 0px #858585",
                boxSizing: "border-box",
                "&:hover": {
                    // boxShadow: "none"
                }

            }} key={i}

        >
            <TCard trash={trash} />
        </Card>)
    };

    return <>

        <Nav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{
            display:'flex', 
            justifyContent:'space-around', 
            flexWrap:'wrap',
            
    
    
    }}>
            {Object.entries(tmap).map(([date, ttr]) => {
                return <>
                    <div style={{
                        boxSizing:'border-box',
                        padding:"1%",
                        borderRadius:20,
                        marginBottom:20,
                        border:'1px solid #797979',
                        marginLeft:20,
                        marginRight:20
                    }}>
                        <Typography sx={{ textAlign: 'center', marginBottom: 1 }} variant="h6">
                            <Chip sx={{
                                userSelect: 'none'
                                , cursor: 'pointer',
                                transform: 'box-shadow 0.05s ease',
                                borderColor:'#797979',
                                "&:hover": {
                                    background:"#0001"
                                },
                                "fontFamily":defFont

                            }} variant="outlined" label={fecha.format(new Date(date), 'mediumDate')}></Chip>
                        </Typography>
                        <div style={{ 
                            textAlign: 'left', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: 15, 
                            flexWrap: "wrap", 
                            marginBottom: 20, 
                            alignItems: 'center' }}>



                            {ttr.map((trash, i) =>
                                trash.content.link ?
                                    <Link target="_blank" style={{ textDecoration: 'none', color: 'inherit' }} href={trash.content.link}>
                                        {cardqe(trash, i)}
                                    </Link>

                                    : cardqe(trash, i)

                            )}

                        </div>
                    </div>

                </>
            })}
        </div>

    </>
}