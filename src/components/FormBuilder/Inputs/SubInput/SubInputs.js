import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import SubInput from './SubInput';

class SubInputs extends Component {
  state = {
    temp: []
  }
  componentDidMount() {
    this.props.onGetDB()

    // this.props.tempFunc3(22)
    // this.tempFunc3(this.state.temp)
  }
  tempFunc(val) {
    console.log(val)
    // console.log(this.props.value)
    // debugger;
    // this.props.tempFunc(val)
  }
  tempFunc3(val) {
    // this.setState({ temp: val})
    // this.props.tempFunc3(this.state.temp)
    // debugger;
    // return val;
  }
  render() {
   const tempFunc3 = (val) => {
      this.props.tempFunc3(val)
    }
    const data = this.props.inputData;
    let subInputs = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].cID === this.props.value) {
          if (typeof data[key].subInputs !== 'undefined') {
            for (let i = 0; i < data[key].subInputs.length; i++) {
              subInputs[i] = <SubInput
                key={i}
                value={data[key].subInputs[i].id}
                tempFunc={this.tempFunc}
                tempFunc3={tempFunc3} />
            }
          }
        }
      }
    }
    return (
      <div>
        {subInputs}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    subInputsCount: state.database.subInputsCount,
    inputData: state.database.inputData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: () =>
      dispatch(actions.getDB())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubInputs);