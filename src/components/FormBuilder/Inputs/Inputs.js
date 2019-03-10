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
    let inputs = [];
    for (let i = 1; i <= this.props.inputsCount; i++) {
      inputs[i] = <Input key={i} value={i} />
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
    inputsCount: state.database.inputsCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: () =>
      dispatch(actions.getDB())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);