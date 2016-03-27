import React from "react";
import TopMenu from "./common/TopMenu";

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <TopMenu />
      {this.props.children}
    </div>
    );
  }

}
