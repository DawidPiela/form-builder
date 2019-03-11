import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import SubInput from './SubInput';

class SubInputs extends Component {
  componentDidMount() {
    this.props.onGetDB()
  }
  render() {
    // console.log('SUBS__', this.props.subInputsCount)
    let subInputs = [];
    for (let i = 1; i <= this.props.subInputsCount; i++) {
      subInputs[i] = <SubInput key={i} value={i} type={this.props.type} />
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
    subInputsCount: state.database.subInputsCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: () =>
      dispatch(actions.getDB())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubInputs);