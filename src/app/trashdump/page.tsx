import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Nav from "../Components/Nav";
import trashtree from '../../../[TrashDump]/trashtree.json';


import timeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
timeAgo.addDefaultLocale(en)
const timeAgoParser = new timeAgo('en-US');


trashtree.reverse();



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
                {trash.content.imgs[0] ?

                    <CardMedia component="img" image={"https://sarthak-pokharel.github.io/sarthak/[TrashDump]/trashcan.jpg"} sx={{ height: 120 }} title={trash.content.title} /> :

                    ""}
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
function CardBottom({trash}){
    return <CardContent sx={{ paddingTop: 0,paddingBottom:"0 !important" }}>
    <Typography variant="body" color="text.secondary" sx={{fontWeight:'bold'}} component="div">
        {trash.content.title||"random bs"}
    </Typography>
    <TimeAgoComp trash={trash}/>
</CardContent>;
}
function TimeAgoComp({trash}){
    return (<Typography variant="caption" color="text.secondary" sx={{ textAlign:'right', padding:0}} component="div"
            >{timeAgoParser.format(trash.date)}</Typography>)
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





export default function trashdump() {
    return <>

        <Nav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-evenly', flexWrap: "wrap" }}>


            {trashtree.map((trash, i) =>
                <Card
                    padding={2}
                    elevation={0}
                    sx={{ width: 300, textTransform:'lowercase' }} key={i}
                >

                    <TCard trash={trash} />
                </Card>

            )}

        </div>

    </>
}