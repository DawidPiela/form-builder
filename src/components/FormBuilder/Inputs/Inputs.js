import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Input from './Input/Input';
import styles from './Inputs.module.scss';

class Inputs extends Component {
  componentDidMount() {
    this.props.onGetDB()
  }
  render() {
    // console.log(this.props.inputData)
    const data = this.props.inputData;
    // console.log(data)
    const inputs = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        for (let i = 0; i < data.length; i++) {
          // console.log(data[key].cID)
          inputs[i] = <Input key={i} value={data[i].cID} />
        }
      }
    }

    return (
      <div className={styles.Inputs}>
        {inputs}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputsCount: state.database.inputsCount,
    inputData: state.database.inputData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: () =>
      dispatch(actions.getDB())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);