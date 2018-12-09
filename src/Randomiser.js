import React, { Component } from "react";
import AddUser from "./components/AddUser";
import ShowUsers from "./components/ShowUsers";
import Timer from "./components/Timer";

class Randomiser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Users: [],
      SpentUsers: [],
      ChosenOne: ""
    };
    this.addUser = this.addUser.bind(this);
    this.ChooseOne = this.ChooseOne.bind(this);
    this.RackEmUp = this.RackEmUp.bind(this);
  }

  addUser(user) {
    var newArray = this.state.Users.slice();
    newArray.push({ user: user });
    this.setState({ Users: newArray });
  }

  ChooseOne() {
    if (this.state.Users.length > 0) {
      var randint = Math.floor(Math.random() * this.state.Users.length);
      this.setState({ ChosenOne: this.state.Users[randint].user });
      var chsnne = this.state.Users[randint].user;
      this.state.Users.splice(randint, 1);
      var newArray = this.state.SpentUsers.slice();
      newArray.push({ user: chsnne });
      this.setState({ SpentUsers: newArray });
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
      <div>
        <section>
          <h2>Add user</h2> <AddUser addUser={this.addUser} />
        </section>
        <section>
          <h2>Added Users</h2>
          {this.state.Users.map(user => (
            <section>
              <ShowUsers user={user.user} />
            </section>
          ))}
        </section>
        <section>
          <h2>The chosen one</h2>
          {this.state.Users.length > 0 && (
            <button onClick={this.ChooseOne}>Choose one</button>
          )}
          {this.state.ChosenOne !== "" && (
            <h3 className="chosenOne">
              <ShowUsers user={this.state.ChosenOne} />
            </h3>
          )}
        </section>
        <section>
          <h2>Spent Users</h2>
          {this.state.SpentUsers.map(user => (
            <section>
              <ShowUsers user={user.user} />
            </section>
          ))}
          {this.state.SpentUsers.length > 0 && (
            <button onClick={this.RackEmUp}>Rack 'em up</button>
          )}
        </section>
        <section>
          <Timer />
        </section>
      </div>
    );
  }
}

export default Randomiser;
