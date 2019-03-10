import React, { Component } from 'react';

class Form extends Component {
  render() {
    const form = [];
    // console.log('form: props', this.props.formData)
    for (let dataName in this.props.formData) {
      form.push(
        {
          name: dataName,
          data: this.props.formData[dataName]
        }
      )
    }

    // console.log('form: form', form)

    // const formOutput = form.map(data => {
    //   switch (data.name) {
    //     case 'text': return <><p>radio</p></>
    //     default: return null
    //   }
    // })

    const formOutput = form.map(data => {
      switch (data.name) {
        case 'type':
          switch (data.data) {
            case 'text': return <p key={data.name}>text</p>
            default: return null;
          }
        // case ''
        default: return null;
      }
    })

    // console.log('form: formOutput', formOutput)

    return (
      <>
        {formOutput}
      </>
    )
  }
}

export default Form;