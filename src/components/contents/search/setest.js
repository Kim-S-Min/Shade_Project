import { makeStyles, fade } from "@material-ui/core";
import React, { useState, useRef, useCallback } from "react";
import { InputBase, Container, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import SearchService from "../../../service/contents/SearchService";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70ch",
    },
    [theme.breakpoints.up("xl")]: {
      width: "120ch",
    },
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(30),
    },
  },
  main: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "95vh",
  },
  closeicon: {
    cursor: "pointer",
  },
  img: {
    width: 50,
    borderRadius: "8%",
  },
  searchitem: {
    float: "left",
  },
  searchbox: {
    marginTop: 5,
    padding: "2%",
    boxShadow: theme.shadows[5],
    borderRadius: "5%",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "80ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100ch",
    },
    [theme.breakpoints.up("xl")]: {
      width: "120ch",
    },
    height: "auto",
    backgroundColor: "white",
    overFlow: "hidden",
    overflowY: "auto",
    // display: "flex",
    alignItems: "center",
    color: "black",
  },
}));

export default function SearchContents() {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { list, setList } = SearchService(query, pageNumber);

  function handleSearch(e) {
    const searchWord = e.target.value;
    setQuery(searchWord);
    const newFilter = list.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setPageNumber(1);

    if (searchWord === "") {
      setList([]);
    } else {
      setList(newFilter);
    }
  }

  const clearInput = () => {
    setList([]);
    setQuery("");
  };

  return (
    <div>
      <Container className={classes.main} variant="xl">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            {list.length === 0 ? (
              <CloseIcon className={classes.closeicon} onClick={clearInput} />
            ) : (
              <SearchIcon />
            )}
          </div>
          <InputBase
            placeholder="검색어를 입력해주세요."
            variant="outlined"
            classes={{
              input: classes.inputInput,
            }}
            // inputProps={{ "aria-label": "search" }}
            onChange={handleSearch}
            value={query}
            type="text"
          />
        </div>

        {query.length !== 0 && (
          <div className={classes.searchbox}>
            {list.slice(0, 15).map((l, key) => {
              return (
                <div key={l.contents_id}>
                  <img
                    className={classes.img}
                    src={"https://images.justwatch.com" + l.poster}
                  />
                  <p>{l.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
