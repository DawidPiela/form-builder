import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Input.module.scss';
import FormInput from '../../../UI/FormInput/FormInput';
import Button from '../../../UI/Button/Button';
import * as elements from './inputElements';
import * as actions from '../../../../store/actions/index';
import SubInputs from '../SubInput/SubInputs';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onAddSubInput = this.onAddSubInput.bind(this);
  }
  state = {
    controls: {
      question: elements.question,
      type: elements.type
    },
    formIsValid: false,
    subs: null,
    question: ''
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.value !== this.props.value) {
    //   this.setState({value: nextProps.value});
    // }
    let questionValue = '';
    let typeValue = 'radio';
    const data = this.props.data;
    if (this.props) {
      questionValue = data.question;
      typeValue = data.type
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

  // componentWillMount() {
  //   console.log('didmount', this.props.question)
  //   let questionValue = '';
  //   let typeValue = 'radio';
  //   const data = this.props.data;
  //   if (this.props) {
  //     questionValue = data.question;
  //     typeValue = data.type
  //   }
  //   const updatedControls = {
  //     ...this.state.controls,
  //     question: {
  //       ...this.state.controls.question,
  //       value: questionValue
  //     },
  //     type: {
  //       ...this.state.controls.type,
  //       value: typeValue
  //     }
  //   }
  //   this.setState({ controls: updatedControls })
  // }

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
    let newId = Date.now();
    if (Array.isArray(newChildInput)) {
      newId = newChildInput[0].id;
      childs = newChildInput;
    }
    const data = this.props.data;
    let updatedFormData = {};
    let keyValue;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] === this.props.value) {
          keyValue = key;
          let oldSubInputs = data.subInputs
          let question = '';
          let newSubInputs = []
          const newSubInput = {
            id: newId,
            conditionValue: '',
            question: '',
            type: 'radio',
            subInputs: childs
          }
          if (oldSubInputs.length === 0) {
            newSubInputs.push(newSubInput)
          } else {
            oldSubInputs.push(newSubInput)
            newSubInputs.push(newSubInput)
            this.tempFunc10(newSubInputs)
          }
          // if(data.question !== '') {
          //   question = data.question
          // } else {
          //   question = this.state.controls.question.value;
          // }
          if (this.state) {
            question = this.state.controls.question.value;
          } else {
            question = data.question
          }
          console.log(this.props.question)
          updatedFormData = {
            ...data,
            [key]: {
              cID: this.props.value,
              question: question,
              type: this.state.controls.type.value,
              subInputs: newSubInputs
            }
          }
        }
      }
    }
    this.props.addInputHandler(updatedFormData[keyValue])
    // this.props.onGetDB(null, null, updatedFormData[keyValue], 0)
  }

  onDeleteHandler = () => {
    this.props.onGetDB(null, this.props.value)
  }

  tempFunc10 = () => {
    const data = this.props.data;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] === this.props.value) {
          let oldSubInputs = data.subInputs
          return oldSubInputs;
        }
      }
    }
  }

  render() {
    console.log('render', this.props.question)
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

const mapDispatchToProps = dispatch => {
  return {
    onGetDB: (inputData, inputIndex, inputValues) =>
      dispatch(actions.getDB(inputData, inputIndex, inputValues))
  }
}

export default connect(null, mapDispatchToProps)(Input);