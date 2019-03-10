import React, { Component } from 'react';

import Form from './Form/Form';

class Forms extends Component {
  render() {
    const tempData = {
      // 'key1': {
      //   type: 'radio',
      //   question: 'Do you own a car?'
      // },
      'key2': {
        type: 'text',
        condition: 'equals',
        conditionValue: 'yes',
        question: 'What is your car model?'
      }
    }
    const fetchedData = [];

    for (let key in tempData) {
      if (tempData.hasOwnProperty(key)) {
        fetchedData.push({
          ...tempData[key],
          id: key
        })
      }
    }

    let forms = fetchedData.map(form => (
      <Form
        key={form.id}
        formData={form}
      />
    ))
    // console.log('forms', fetchedData)
    return (
      <>
        {forms}
      </>
    )
  }
}

export default Forms;