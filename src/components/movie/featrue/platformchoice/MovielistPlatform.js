import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";

import ArrayMenu from "./ArrayMenu";
import Platformlist from "./Platformlist";
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
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    padding: theme.spacing(1),    
  },
}));

export default function MovielistPlatform() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            영화
          </Typography>
          <Platformlist/>
          <ArrayMenu/>
        </Toolbar>
      </AppBar>
    </div>
  )
}