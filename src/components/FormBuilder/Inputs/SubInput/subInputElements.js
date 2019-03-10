export const condition = {
  elementText: 'Condition',
  elementType: 'select',
  elementConfig: {
    options: [
      {value: 'equals', displayValue: 'Equals'},
      {value: 'greater', displayValue: 'Greater than'},
      {value: 'less', displayValue: 'Less than'}
    ]
  }
}

export const radioConditionValue = {
  elementType: 'select',
  elementConfig: {
    options: [
      {value: 'yes', displayValue: 'Yes'},
      {value: 'no', displayValue: 'No'}
    ]
  }
}

export const inputConditionValue = {
  elementType: 'text',
  value: '',
  validation: {
    required: true
  },
  valid: false,
  touched: false
}

export const question = {
  elementText: 'Question',
  elementType: 'text',
  value: '',
  validation: {
    required: true
  },
  valid: false,
  touched: false
}

export const type = {
  elementText: 'Type',
  elementType: 'select',
  elementConfig: {
    options: [
      {value: 'radio', displayValue: 'Yes / No'},
      {value: 'number', displayValue: 'Number'},
      {value: 'text', displayValue: 'Text'}
    ]
  }
}