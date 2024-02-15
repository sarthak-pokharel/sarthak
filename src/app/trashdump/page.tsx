import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import Nav from "../Components/Nav";
import trashtree from '../../../[TrashDump]/trashtree.json';
import { AppProps } from 'next/app';

import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FishNChips, TimeAgoComp } from "./Dynamics";
timeAgo.addDefaultLocale(en)



trashtree.reverse();

async function fetchTrashDumps(){
    // console.log(process.env.URL+"/.netlify/functions/gettrashdumps")
    let j = await (await fetch(process.env.URL+"/.netlify/functions/gettrashdumps",{ next: { revalidate: 3600/2 } })).text();
    console.log(j);
    j = JSON.parse(j);
    return j.sort(function(a,b){
        return b.date-a.date;
    });
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
    return <>
        <div style={{ display: 'flex', flexDirection: 'column', height: "100%", justifyContent: 'space-between' }}>

            <CardContent>
                <Typography

                    sx={{ "whiteSpace": "pre-wrap" }}
                >{trash.content.text}</Typography>
            </CardContent>
            <CardBottom trash={trash} />
        </div>
    </>
}





export default async function trashdump() {
    let ttr = await fetchTrashDumps();
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