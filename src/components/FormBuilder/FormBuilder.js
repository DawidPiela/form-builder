import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Inputs from './Inputs/Inputs';
import Button from '../UI/Button/Button';

class FormBuilder extends Component {
  state = {
    inputsCount: 0
  }

  addInputHandler = () => {
    this.props.onGetDB(1)
  }

  render() {

    return (
      <>
        <Inputs />
        <Button clicked={this.addInputHandler}>Add Input</Button>
      </>
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
    onGetDB: (inputData) =>
      dispatch(actions.getDB(inputData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);