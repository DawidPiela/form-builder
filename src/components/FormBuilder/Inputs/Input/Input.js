import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Input.module.scss';
import FormInput from '../../../UI/FormInput/FormInput';
import Button from '../../../UI/Button/Button';
import * as elements from './inputElements';
import * as actions from '../../../../store/actions/index';
// import SubInput from '../SubInput/SubInput';
import SubInputs from '../SubInput/SubInputs';

class Input extends Component {
  state = {
    controls: {
      question: elements.question,
      type: elements.type
    },
    formIsValid: false
  }

  componentDidMount() {
    let questionValue;
    let typeValue;
    if (typeof this.props.inputQuestions !== 'undefined' && this.props.inputQuestions[0]) {
      questionValue = this.props.inputQuestions[this.props.value - 1];
      typeValue = this.props.inputTypes[this.props.value - 1] || 'radio';
    } else {
      questionValue = '';
      typeValue = 'radio';
    }
    const updatedControls = {
      ...this.state.controls,
      question: {
        ...this.state.controls.question,
        value: questionValue
      },
      type: {
        ...this.state.controls.type,
        value: typeValue
      }
    }
    this.setState({ controls: updatedControls })
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
    // this.setState({ subInputCount: this.state.subInputCount + 1 })
    const data = {
      question: this.state.controls.question.value,
      type: this.state.controls.type.value,
      id: this.props.value
    }
    this.props.onGetDB(null, null, data, 0)
  }

  onDeleteHandler = () => {
    this.props.onGetDB(null, this.props.value)
  }

  render() {
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
        </div>
        <SubInputs type={this.state.controls.type.value} />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputsCount: state.database.inputsCount,
    inputQuestions: state.database.inputQuestions,
    inputTypes: state.database.inputTypes,
    subInputsCount: state.database.subInputsCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: (inputData, inputIndex, inputValues) =>
      dispatch(actions.getDB(inputData, inputIndex, inputValues))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);