import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Input.module.scss';
import FormInput from '../../../UI/FormInput/FormInput';
import Button from '../../../UI/Button/Button';
import * as elements from './inputElements';
import * as actions from '../../../../store/actions/index';

class Input extends Component {
  state = {
    controls: {
      question: elements.question,
      type: elements.type
    },
    formIsValid: false
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
        <p className={styles.formItem}>{formElement.config.elementText}</p>
        <div className={styles.formItem}>
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
      <div className={styles.inputBox}>
        {form}
        <div>
          <Button>Add Sub-Input</Button>
          <Button clicked={this.onDeleteHandler}>Delete</Button>
        </div>
        <p>{this.props.value}</p>
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
    onGetDB: (inputData, inputIndex) =>
      dispatch(actions.getDB(inputData, inputIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);