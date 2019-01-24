import React, { Component } from "react";
import AddUser from "./components/AddUser";
import ShowUsers from "./components/ShowUsers";
import Timer from "./components/Timer";
import { isNullOrUndefined } from "util";

class Randomiser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Users: [],
      SpentUsers: [],
      ChosenOne: "",
      teamSize: "1",
      CurrentTeam: [{ user: "Simon" }, { user: "David" }]
    };
    this.addUser = this.addUser.bind(this);
    this.ChooseOne = this.ChooseOne.bind(this);
    this.RackEmUp = this.RackEmUp.bind(this);
    this.teamSizechange = this.teamSizechange.bind(this);
    this.addCurrentTeam = this.addCurrentTeam.bind(this);
  }

  teamSizechange(event) {
    this.setState({ teamSize: event.target.value });
  }

  addUser(user) {
    var newArray = this.state.Users.slice();
    newArray.push({ user: user });
    this.setState({ Users: newArray });
  }

  addCurrentTeam() {
    //b = [...a, 4];
    var newArray = this.state.Users.slice();
    // this.state.CurrentTeam.forEach(element => {
    //   newArray.push({ user: {element}});
    // });
    newArray = newArray.concat([
      { user: "Simon" },
      { user: "David" },
      { user: "Stephen" },
      { user: "JoshH" },
      { user: "Lukasz" },
      { user: "Priya" },
      { user: "JoshA" },
      { user: "Jordan" },
      { user: "Lydia" },
      { user: "Len" },
      { user: "Anthony" },
      { user: "Elliott" }
    ]);
    this.setState({ Users: newArray });
  }

  ChooseOne() {
    if (this.state.Users.length >= this.state.teamSize) {
      var i;
      var thisSetOfUsers = "";
      var tempUserArray = [];
      for (i = 0; i < this.state.teamSize; i++) {
        var randint = Math.floor(Math.random() * this.state.Users.length);
        thisSetOfUsers += this.state.Users[randint].user + "\r\n";

        tempUserArray = tempUserArray.concat([
          { user: this.state.Users[randint].user }
        ]);

        this.state.Users.splice(randint, 1);
      }
      var newArray = this.state.SpentUsers.slice();
      tempUserArray.forEach(element => {
        newArray.push({ user: element.user });
      });

      this.setState({ SpentUsers: newArray });
      this.setState({ ChosenOne: thisSetOfUsers });
    } else {
      alert("No names entered.");
    }
  }

  RackEmUp() {
    var newArray = this.state.SpentUsers.slice();
    this.setState({ Users: newArray, SpentUsers: [], ChosenOne: "" });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="box a">
          <h2>Add user</h2> <AddUser addUser={this.addUser} />
          <button onClick={this.addCurrentTeam}>Add current team</button>
        </div>
        <div className="box b">
          <h2>Added Users</h2>
          {this.state.Users.map(user => (
            <section>
              <ShowUsers user={user.user} />
            </section>
          ))}
        </div>
        <div className="box c">
          <h2>The chosen one</h2>
          {this.state.Users.length > 0 && (
            <div>
              <select id="teamSize" onChange={this.teamSizechange}>
                <option key="1" value="1">
                  1
                </option>
                <option key="2" value="2">
                  2
                </option>
                <option key="3" value="3">
                  3
                </option>
                <option key="4" value="4">
                  4
                </option>
              </select>
              <button onClick={this.ChooseOne}>Choose one</button>
            </div>
          )}
          {this.state.ChosenOne !== "" && (
            <h3 className="chosenOne">
              <ShowUsers user={this.state.ChosenOne} />
            </h3>
          )}
        </div>
        <div className="box d">
          <h2>Spent Users</h2>
          {this.state.SpentUsers.map(user => (
            <section>
              <ShowUsers user={user.user} />
            </section>
          ))}
          {this.state.SpentUsers.length > 0 && (
            <button onClick={this.RackEmUp}>Rack 'em up</button>
          )}
        </div>
        <div className="box e">
          <Timer />
        </div>
      </div>
    );
  }
}

export default Randomiser;
