import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import SubInput from './SubInput';

class SubInputs extends Component {
  componentDidMount() {
    this.props.onGetDB()
  }
  tempFunc(val) {
    console.log(val)
  }
  render() {
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
                arr={this.props.arr}
                tempFunc={this.tempFunc} />
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