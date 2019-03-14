import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import SubInput from './SubInput';
import styles from './SubInputs.module.scss';

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

  }
  tempFunc3(val) {
  }
  render() {

    const tempFunc3 = (val) => {
      this.props.tempFunc3(val)
    }
    let subInputs = [];
    if (this.props.tempFunc10) {
      const data = this.props.tempFunc10
      for (let i = 0; i < data.length; i++) {
        if (!data[i].id) {
          data[i].id = 111;
        }
        subInputs[i] = <SubInput
          key={i}
          value={data[i].id}
          tempFunc={this.tempFunc}
          tempFunc3={tempFunc3}
          id={data[i].id}
          childs={data[i].subInputs} />
      }
    }
    if (this.props.tempFunc0) {
      // console.log('SUBS__', this.props.tempFunc0())
      // const data = this.props.tempFunc0();
      // subInputs = [];
      // for (let key in data) {
      // if (data.hasOwnProperty(key)) {
      // if (data[key].cID === this.props.value) {
      // if (typeof data[key].subInputs !== 'undefined') {
      // for (let i = 0; i < data.length; i++) {
      //   subInputs[i] = <SubInput
      //     key={i}
      //     value={data.id}
      //     tempFunc={this.tempFunc}
      //     tempFunc3={tempFunc3} />
      // }
      // }
      // }
      // }
      // }
    } else {
      // const data = this.props.inputData;
      // subInputs = [];
      // for (let key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     if (data[key].cID === this.props.value) {
      //       if (typeof data[key].subInputs !== 'undefined') {
      //         for (let i = 0; i < data[key].subInputs.length; i++) {
      //           subInputs[i] = <SubInput
      //             key={i}
      //             value={data[key].subInputs[i].id}
      //             tempFunc={this.tempFunc}
      //             tempFunc3={tempFunc3} />
      //         }
      //       }
      //     }
      //   }
      // }
    }


    return (
      <div className={styles.subs}>
        {subInputs}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    subInputsCount: state.database.subInputsCount
    // inputData: state.database.inputData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: () =>
      dispatch(actions.getDB())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubInputs);