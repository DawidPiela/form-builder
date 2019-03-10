import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Input.module.scss';
import FormInput from '../../../UI/FormInput/FormInput';
import Button from '../../../UI/Button/Button';
import * as elements from './inputElements';
import * as actions from '../../../../store/actions/index';
import SubInput from '../SubInput/SubInput';

class Input extends Component {
  state = {
    controls: {
      question: elements.question,
      type: elements.type
    },
    formIsValid: false,
    subInputCount: 0
  }

  componentDidMount() {
    const updatedControls = {
      ...this.state.controls,
      question: {
        ...this.state.controls.question,
        value: this.props.inputData[this.props.value - 1]
      },
      type: {
        ...this.state.controls.question,
        // value: this.props.inputData[this.props.value - 1]
      }
    }
    this.setState({controls: updatedControls})
    // this.props.inputData
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    let formIsValid = true
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  onAddSubInput = () => {
    console.log(this.props.inputData, this.props.value)
    this.setState({ subInputCount: this.state.subInputCount + 1 })
    const data = {
      question: this.state.controls.question.value,
      type: this.state.controls.type.value,
      id: this.props.value
    }
    console.log(data);
    this.props.onGetDB(null, null, data)
  }

  onDeleteHandler = () => {
    this.props.onGetDB(null, this.props.value)
  }

  render() {
    const subInputs = [];
    for (let i = 0; i < this.state.subInputCount; i++) {
      subInputs.push(<SubInput key={i} />)
    }
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => (
      <div key={formElement.id}>
        <p>{formElement.config.elementText}</p>
        <div>
          <FormInput
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        </div>
      </div>
    ))

    return (
      <>
        <div className={styles.inputBox}>
          {form}
          <div>
            <Button clicked={this.onAddSubInput}>Add Sub-Input</Button>
            <Button clicked={this.onDeleteHandler}>Delete</Button>
          </div>
          <p>{this.props.value}</p>
        </div>
        {subInputs}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Input);