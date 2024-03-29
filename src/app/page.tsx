import Image from "next/image";
import styles from "./page.module.css";
import Nav from './Components/Nav';
import { Chip, Typography } from "@mui/material";
import Link from "next/link";
import { ContactPage } from "@mui/icons-material";
export default function Home() {
  return (
    <>
      <Nav />
      <main>

        <div style={{position:'absolute', left:'50%', transform:'translateX(-50%)',bottom: '15%',textAlign:'center'}} >
        <Typography variant="h4">
          site under construction
        </Typography>
        <Typography>
          yet explorable. you may continue your journey here.
          <br/><br/>
          <b>"nothing personal is published here"</b> for stalking being thy intention.
        </Typography>
        <br/><br/>
        <Typography variant='h5' style={{textAlign:'center'}}>Looking for my &nbsp;
          <Link target="_blank" href="https://prof.sarthakpokhrel.com.np" style={{textDecoration:'none', color:'#00e'}}>
            Professional Portfolio
          </Link> ?
        </Typography>
        </div>
      </main>
    </>
  );
}
