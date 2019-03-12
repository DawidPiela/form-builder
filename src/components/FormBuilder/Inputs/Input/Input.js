import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Input.module.scss';
import FormInput from '../../../UI/FormInput/FormInput';
import Button from '../../../UI/Button/Button';
import * as elements from './inputElements';
import * as actions from '../../../../store/actions/index';
import SubInputs from '../SubInput/SubInputs';

class Input extends Component {
  state = {
    controls: {
      question: elements.question,
      type: elements.type
    },
    formIsValid: false,
    subs: null
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

    this.props.tempFunc2(2)
  }

  tempFunc(val) {
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

  onAddSubInput = (newChildInput) => {
    let childs = [];
    if (Array.isArray(newChildInput)) {
      childs = newChildInput;
    }
    // debugger;
    const data = this.props.inputData;
    let updatedFormData = {};
    let keyValue;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].cID === this.props.value) {
          keyValue = key;
          let oldSubInputs = data[key].subInputs
          let newSubInputs = []
          const newSubInput = {
            id: Date.now(),
            conditionValue: '',
            question: '',
            type: 'radio',
            subInputs: childs
          }
          if (oldSubInputs.length === 0) {
            newSubInputs.push(newSubInput)
          } else {
            // debugger;
            oldSubInputs.push(newSubInput)
            newSubInputs.push(newSubInput)


            // oldSubInputs[0].subInputs.push(newSubInput);
            // newSubInputs = oldSubInputs;
            // console.log('im here')
            // console.log(newSubInputs)
            debugger;
            this.tempFunc10(newSubInputs)
          }
          updatedFormData = {
            ...data,
            [key]: {
              cID: data[key].cID,
              question: this.state.controls.question.value,
              type: this.state.controls.type.value,
              subInputs: newSubInputs
            }
          }
        }
      }
    }
    this.props.onGetDB(null, null, updatedFormData[keyValue], 0)
  }

  // tempFunc3(val) {
  //   this.onAddSubInput(val)
  //   return val;
  // }

  onDeleteHandler = () => {
    this.props.onGetDB(null, this.props.value)
  }

  tempFunc10 = () => {
    const data = this.props.inputData;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key].cID === this.props.value) {
          let oldSubInputs = data[key].subInputs
          return oldSubInputs;
        }
      }
    }
  }

  render() {
    const tempFunc3 = (val) => {
      this.onAddSubInput(val)
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
            {this.props.value}
          </div>
        </div>
        <SubInputs
          type={this.state.controls.type.value}
          value={this.props.value}
          tempFunc={this.tempFunc}
          tempFunc3={tempFunc3}
          tempFunc10={this.tempFunc10()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Input);