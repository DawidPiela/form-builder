import React, { Component } from 'react';

import * as elements from './subInputElements';
import Button from '../../../UI/Button/Button';
import FormInput from '../../../UI/FormInput/FormInput';
import styles from './SubInput.module.scss';

class SubInput extends Component {
  state = {
    controls: {
      condition: elements.condition,
      radioConditionValue: elements.radioConditionValue,
      inputConditionValue: elements.inputConditionValue,
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => {
      switch (this.props.type) {
        case 'radio':
          if (formElement.id === 'condition' || formElement.id === 'inputConditionValue') {
            return null;
          }
          break;
        case 'number':
          if (formElement.id === 'radioConditionValue' || formElement.id === 'inputConditionValue') {
            return null;
          }
          break;
        case 'text':
          if (formElement.id === 'radioConditionValue' || formElement.id === 'condition') {
            return null;
          }
          break;
        default: ;
      }
      return (
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
      )
    })

    return (
      <>
        <div className={styles.inputBox}>
          {form}
          <div>
            <Button clicked={this.onAddSubInput}>Add Sub-Input</Button>
            <Button clicked={this.onDeleteHandler}>Delete</Button>
          </div>
        </div>
      </>
    )
  }
}

export default SubInput;