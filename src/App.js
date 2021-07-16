import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Grid } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieListComponent from "./components/MovieListContent";
import Join from "./components/Join";
import Login from "./components/Login";
import MovieDetailComponent from "./components/MovieDetailComponent";
import MovieRecommendComponent from "./components/MovieRecommendComponent";
// import Home from "./components/Home";
import Mypage from "./components/Mypage";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import FAQ from "./components/FAQ";
import FindId from "./components/FindId";
import FindPw from "./components/FindPw";

function App() {
  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <Header/>
        </Grid>
        <Grid item container> 
          <Grid item xs={12}>
            <Switch>
              <Route exact path={["/", "/movielist"]} component = {MovieListComponent}></Route>
              <Route exact path="/moviedetail/:contents_id" component = {MovieDetailComponent}></Route>
              <Route exact path="/recommend" component = {MovieRecommendComponent}></Route>
              {/* <Route exact path={["/", "/home"]} component={Home} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/user" component={BoardUser} />
              <Route exact path="/admin" component={BoardAdmin} />
              <Route exact path="/faq" component={FAQ}/>
              <Route exact path="/findid" component={FindId}/>
              <Route exact path="/findpw" component={FindPw}/>
            </Switch>
          </Grid> 
        </Grid>
        <Grid item>
          <Footer/>
        </Grid>
      </Grid>
    </Router>

  );
}

export default App;
