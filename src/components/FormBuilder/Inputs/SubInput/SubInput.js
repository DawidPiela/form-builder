import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as elements from './subInputElements';
import Button from '../../../UI/Button/Button';
import FormInput from '../../../UI/FormInput/FormInput';
import styles from './SubInput.module.scss';
import SubInputs from './SubInputs';
import * as actions from '../../../../store/actions';

class SubInput extends Component {
  state = {
    controls: {
      condition: elements.condition,
      equalsCondition: elements.equalsCondition,
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

  onAddSubInput = () => {
    const data = this.props.inputData;
    let updatedFormData = {};
    let keyValue;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].subInputs[key].id === this.props.value) {
          keyValue = key;
          let oldSubInputs = data[key].subInputs[key].subInputs
          let newSubInputs = []
          const newSubInput = {
            id: Date.now(),
            conditionValue: '',
            question: '',
            type: 'radio',
            subInputs: []
          }
          if (oldSubInputs.length === 0) {
            newSubInputs.push(newSubInput)
          } else {
            oldSubInputs.push(newSubInput)
            newSubInputs = oldSubInputs;
            this.tempFunc0(newSubInputs)
          }
          this.props.tempFunc(newSubInputs)
          this.props.tempFunc3(newSubInputs)
        }
      }
    }
    // this.props.onGetDB(null, null, updatedFormData[keyValue], 0)
  }

  tempFunc(val) {
  }

  tempFunc3(val) {
  }

  tempFunc0() {
    if (this.props) {
      const data = this.props.inputData;
      let updatedFormData = {};
      let keyValue;
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].subInputs[key].id === this.props.value) {
            keyValue = key;
            let oldSubInputs = data[key].subInputs[key].subInputs
            let newSubInputs = []
            const newSubInput = {
              id: Date.now(),
              conditionValue: '',
              question: '',
              type: 'radio',
              subInputs: []
            }
            if (oldSubInputs.length === 0) {
              newSubInputs.push(newSubInput)
            } else {
              oldSubInputs.push(newSubInput)
              newSubInputs = oldSubInputs;
            }
            return newSubInputs;
          }
        }
      }
    } else {
      return
    }

  }

  tempFunc10 = () => {
    return this.props.childs
  }

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
          if (formElement.id === 'radioConditionValue' || formElement.id === 'equalsCondition') {
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
            {this.props.value}
          </div>
        </div>
        <div className={styles.subss}>
          <SubInputs
            type={this.state.controls.type.value}
            value={this.props.value}
            tempFunc={this.tempFunc}
            tempFunc3={this.tempFunc3}
            tempFunc0={this.tempFunc0}
            tempFunc10={this.tempFunc10()} />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputsCount: state.database.inputsCount,
    inputQuestions: state.database.inputQuestions,
    inputTypes: state.database.inputTypes,
    subInputsCount: state.database.subInputsCount,
    inputData: state.database.inputData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: (inputData, inputIndex, inputValues) =>
      dispatch(actions.getDB(inputData, inputIndex, inputValues))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubInput);