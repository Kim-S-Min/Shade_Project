import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Card, Grid, CardMedia, CardActionArea, CssBaseline, useScrollTrigger, Fab, Zoom, Toolbar, AppBar, Typography } from "@material-ui/core";
import ContentsService from "../service/ContentsService";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import MovieDetailService from "../service/MovieDetailService";
// import MovieDetailComponent from "./MovieDetailComponent";
// import Google from "../img/google";
// import Naver from "../img/naver";
// import Netflix from "../img/netflix";
// import Watcha from "../img/watcha";
// import Wavve from "../img/wavve";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  media: {
      height: 285,
      width: "100%",
  },
  pageup: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const pageupClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={pageupClick} role="presentation" className={classes.pageup}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

export default function ContentList(props) {
  const classes = useStyles();
  const [query] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [open, setOpen] = React.useState(false);

  const {
    list,
    hasMore,
    loading,
    error
  } = ContentsService(query, pageNumber)

  const observer = useRef()
  const lastPageElementRef = useCallback(node => {
    if (loading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node) 
  }, [loading, hasMore])

  const handleOpen = () => {
    setOpen(true);
  };

  // const openModal = (contents_id) => {
  //  setOpen(true);  
  // }
  // const onClick = openModal(l.contents_id) {
  //  MovieDetailService.getMovieDetail(contents_id).then(res => {
  //   setMovieDetail(res.data)
  //  })  
  // }
  return (
    <React.Fragment>
      <CssBaseline/>
      {/* <Listplatform/> */}
      <main>
      <Toolbar id="back-to-top-anchor" />
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={1}>
            {list.map((l, index) => {
                if (list.length === index + 1) {
                return <div ref={lastPageElementRef} key={l.contents_id}>
                  <Link to={'/moviedetail/'+l.contents_id}><img src={'https://images.justwatch.com'+l.poster} alt="moviePoster"/></Link>
                </div>
                } else {
                return (
                  <Grid item key={l.contents_id} xs={6} sm={3} md={2}>
                    <Card className={classes.card} >
                      <CardActionArea type="button" onClick={handleOpen}>
                        <Link to={'/moviedetail/'+l.contents_id}>
                          <CardMedia 
                            className={classes.media}
                            title="contents_id"
                            image={'https://images.justwatch.com'+l.poster}
                          >
                          </CardMedia>
                        </Link>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )}
            })}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'End...'}</div>  {/* 페이징이 모두 끝나게 되면 Loading과 End가 동시에 출력된다 */}
 
          </Grid>
        </Container>
      </main>
      <ScrollTop {...props}>
        <Fab color="grey" size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}