import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Input from './Input/Input';
import styles from './Inputs.module.scss';

class Inputs extends Component {
  componentDidMount() {
    this.props.onGetDB()
  }

  addInputHandler = (value) => {
    this.props.onGetDB(null, null, value, 0)
  }

  render() {
    const data = this.props.inputData;
    const inputs = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        for (let i = 0; i < data.length; i++) {
          inputs[i] = <Input
            key={i}
            data={data[i]}
            value={data[i].cID}
            question={data[i].question}
            addInputHandler={this.addInputHandler}
          />
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
    onGetDB: (inputData, inputIndex, inputValues) =>
      dispatch(actions.getDB(inputData, inputIndex, inputValues))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);