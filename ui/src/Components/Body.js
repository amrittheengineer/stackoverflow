import React from "react";
import Navbar from "./Navbar";
import NavWithSearch from "./NavWithSearch";
import Search from "./Search";
import Loader from "./Loader";
import LoadedBody from "./LoadedBody";
import Answer from "./Answer";

var qs = require("querystring");
var axios = require("axios");

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.ansCounter = this.ansCounter.bind(this);
    this.state = {
      nav: <Navbar />,
      body: (
        <div>
          <Search search={this.search} />
        </div>
      ),
      answerlst: [],
      noScoreAns: [],
      ansCount: 0
    };
  }
  componentWillUnmount() {
    this.setState({
      nav: <NavWithSearch search={this.search} />,
      body: <Loader /> //<Answer answer="Hello" />
    });
  }
  ansCounter() {
    this.setState({
      ansCount: this.state.ansCount + 1
    });
    return this.state.ansCount;
  }
  search(ev) {
    if (ev.charCode === 13) {
      //   var answerlst = [];
      var query = ev.target.value.trim();

      this.setState({
        nav: <NavWithSearch search={this.search} />,
        body: <Loader />
      });
      axios
        .request({
          url: "/google/api",
          method: "POST",
          data: qs.stringify({
            query: query
          }),
          baseURL: "http://localhost:5000",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(gres => {
          // console.log(gres.data);
          var stackOverflowQuestionIds = [];
          Object.values(gres.data).forEach(sURL => {
            stackOverflowQuestionIds.push(sURL.split("/")[4]);
          });

          stackOverflowQuestionIds.forEach(qId => {
            axios
              .request({
                url: "/stackoverflow/api/question/" + qId,
                method: "GET",
                baseURL: "http://localhost:5000",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Access-Control-Allow-Origin": "*"
                }
              })
              .then(sres => {
                sres.data.forEach(dta => {
                  console.log(dta);
                  if (dta.replyScores.length) {
                    let avg =
                      dta.replyScores.reduce((x, y) => x + y) /
                      dta.replyScores.length;
                    console.log(avg);

                    if (avg >= 0) {
                      this.setState({
                        answerlst: this.state.answerlst.concat(
                          <Answer key={this.ansCounter()} answer={dta.answer} />
                        ),
                        body: (
                          <LoadedBody
                            answerlst={this.state.answerlst}
                            noScoreAns={this.state.noScoreAns}
                          />
                        )
                      });
                    }
                  } else {
                    this.setState({
                      noScoreAns: this.state.noScoreAns.concat(
                        <Answer key={this.ansCounter()} answer={dta.answer} />
                      ),
                      body: (
                        <LoadedBody
                          answerlst={this.state.answerlst}
                          noScoreAns={this.state.noScoreAns}
                        />
                      )
                    });
                  }
                });
              })
              .catch(err => console.log(err));
          });
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div>
        {this.state.nav}
        {this.state.body}
      </div>
    );
  }
}

export default Body;
