import React, { Component } from "react";

class ShowUsers extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
        <section>
           {this.props.user} <button onClick={e => {
            e.preventDefault();
            this.props.delUser(this.props.user);
          }}
        >Del</button>
        
        </section>
      )
  }
}
export default ShowUsers;
