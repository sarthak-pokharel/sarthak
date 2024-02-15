import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import Nav from "../Components/Nav";
import trashtree from '../../../[TrashDump]/trashtree.json';
import { AppProps } from 'next/app';
import { marked } from "marked";
import './page.css'

import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FishNChips, TimeAgoComp } from "./Dynamics";
timeAgo.addDefaultLocale(en)


trashtree.reverse();

async function fetchTrashDumps(){
    let j = await (await fetch(process.env.URL+'/api/gettrashdumps')).text();
    console.log(j)
    j = JSON.parse(j);
    // console.log(j);
    // let j = []
    j.sort(function(a,b){
        return b.date-a.date;
    });
    return j;
}
;

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
                <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
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
    return <CardContent sx={{ paddingTop: 0, paddingBottom: "0 !important" }}>
        <FishNChips trash={trash} />
        <Typography variant="body" color="text.secondary" sx={{ fontWeight: 'bold' }} component="div">
            {trash.content.title || <>untitled card</>}
        </Typography>
        <TimeAgoComp trash={trash} />
    </CardContent>;
}

function TextOnly({ trash }) {
    let proc_cont = trash.content.text;
    proc_cont = marked(trash.content.text);
    return <>
        <div style={{ display: 'flex', flexDirection: 'column', height: "100%", justifyContent: 'space-between' }}>

            <CardContent>
                <Typography

                    sx={{ "whiteSpace": "pre-wrap" }}
                >
                    <div dangerouslySetInnerHTML={{__html: proc_cont}}></div>
                </Typography>
            </CardContent>
            <CardBottom trash={trash} />
        </div>
    </>
}





export default async function trashdump() {
    let ttr = await fetchTrashDumps();
    // let ttr = trashtree;
    return <>

        <Nav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-evenly', flexWrap: "wrap" }}>


            {ttr.map((trash, i) =>
                <Card
                    padding={2}
                    elevation={0}
                    sx={{ width: 300, textTransform: 'lowercase',
                          marginBottom:2
                }} key={i}
                >

                    <TCard trash={trash} />
                </Card>

            )}

        </div>

    </>
}