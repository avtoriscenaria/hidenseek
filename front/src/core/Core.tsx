import React, { Component } from "react";
import { connect } from "react-redux";

import { initiateSocket } from "./socket";

interface ICoreProps {
  dispatch: any;
}

class Core extends Component<ICoreProps> {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    initiateSocket();
    //    dispatch(loadInitialData())
    // socket = io.connect("http://localhost:3000");

    // dispatch(loadInitialDataSocket(socket));
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(Core);
