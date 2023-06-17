import React, { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.counter}</h1>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
    return{
        counter:state.counterReducer
    }

  };
  

export default connect(mapStateToProps)(Counter);