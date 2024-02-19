"use client";
import { Button, Chip, FormControl, Stack, TextField } from "@mui/material";
import Nav from "../Components/Nav";
import { useState } from "react";
import axios from 'axios';

async function makeSubmitApiReq({upCont, password}){
    let dat = upCont;
    let tp = {
        content: {
            title: dat.title, 
            text: dat.content,
            imgs: [],
            link: dat.link
        },
        date: Date.now(),
        labels: dat.labels
    };

    let req = await axios.post("/api/dumptrash", {dat: tp, password});
    // console.log(req);
    if(req.data.success){
        console.log("Posted");
    }else {
        console.log(req.data.error)
    }
    return true;
}


export default function makepost() {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    const [label, setLabel] = useState('');
    const [labels, setLabels] = useState([]);
    const [password, setPassword] = useState("");

    const handleAddLabel = (e) => {
        e.preventDefault();
        if (label && !labels.includes(label)) {
            setLabels([...labels, label]);
            setLabel('');
        }
    };

    const handleDeleteLabel = (chipToDelete) => () => {
        setLabels((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit your form data here
        console.log({ title, content, labels,link });

        makeSubmitApiReq({upCont: {title, content, labels}, password})
    };
    return <>
        <Nav />
        <br/>
        <br/>

        <form onSubmit={handleSubmit} style={{ 
            display:'block', 
            maxWidth: 500, 
            width: '90%', 
            textAlign: 'center', 
            margin: 'auto',
            background: '#fff',
            padding: "2%",
            borderRadius: 20
            }}>

            <Stack spacing={2}>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <TextField
                    label="Link"
                    variant="outlined"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                
                <TextField
                    label="Labels"
                    variant="outlined"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddLabel(e)}
                />
                <Stack direction="row" spacing={1}>
                    {labels.map((data, index) => (
                        <Chip
                            key={index}
                            label={data}
                            onDelete={handleDeleteLabel(data)}
                        />
                    ))}
                </Stack>
                <br/>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained">Submit</Button>
            </Stack>
        </form>
    </>
}