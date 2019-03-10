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