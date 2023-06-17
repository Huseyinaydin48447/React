import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { increaseCounter } from "../redux/actions/counterActions";
import { connect } from "react-redux";

class IncreaseCounter extends Component {
  render() {
    return (
      <div>
        <button
          style={{
            backgroundColor: "lightblue",
            width: "100px",
            height: "50px",
          }}
          onClick={(e) => {
            this.props.dispatch(increaseCounter());
          }}
        >1 arttır</button>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(increaseCounter, dispatch) };
}

export default connect(mapDispatchToProps)(IncreaseCounter);
