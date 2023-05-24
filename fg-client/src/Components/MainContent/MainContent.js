import React, { Component } from "react";
import "./MainContent.css";
import { Grid } from "@material-ui/core";
import StatusBar from "../StatusBar/StatusBar";
import MainPage from "../MainPage/MainPage";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={7}>
            <div>
              <StatusBar />
              <MainPage />
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default MainContent;
