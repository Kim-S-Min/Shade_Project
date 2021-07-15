import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button } from "@material-ui/core";

import Google from "../../../../img/google.jpeg";
import Naver from "../../../../img/naver.jpeg";
import Wavve from "../../../../img/wavve.jpeg";
import Netflix from "../../../../img/netflix.jpeg";
import Watcha from "../../../../img/watcha.jpeg";
import Googleoff from "../../../../img/googleoff.jpeg";
import Naveroff from "../../../../img/naveroff.jpeg";
import Wavveoff from "../../../../img/wavveoff.jpeg";
import Netflixoff from "../../../../img/netflixoff.jpeg";
import Watchaoff from "../../../../img/watchaoff.jpeg";

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      padding: theme.spacing(1),    
    },
    li: {
      float: "left",
      margin: 0,
      padding: 0,
    },
    img: {
      width: 30,
      [theme.breakpoints.up('sm')]: {
          width: 50,
      },
    },
  }));

export default function Platformlist() {
    const classes = useStyles();
    const select = () => console.log("hello")
    const [off, setOff] = useState(0);

    let i = 1;

    const Check = () => {
        if (i === 1) {
            setOff(off - 1);
            console.log(off);
        } else {
            setOff(off + 1);
            console.log(off);
        }
    }
    useEffect(select, [off]);

    return (
        <Grid className={classes.title} >
        <ul>
            <li className={classes.li}>
                <Button onClick={Check}>
                    <img className={classes.img} src={Netflix} alt="netflix" />
                </Button>
            </li>
            <li className={classes.li}>
                <Button>
                    <img className={classes.img} src={Watcha} alt="watcha"/>
                </Button>
            </li>
            <li className={classes.li}>
                <Button>
                    <img className={classes.img} src={Google} alt="google"/>
                </Button>
            </li>
            <li className={classes.li}>
                <Button>
                    <img className={classes.img} src={Naver} alt="naver"/>
                </Button>
            </li>
            <li className={classes.li}>
                <Button>
                    <img className={classes.img} src={Wavve} alt="wavve"/>
                </Button>
            </li>
        </ul>
      </Grid>
    )
}