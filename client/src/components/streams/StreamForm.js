import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  // formProps is passed by Field - It contains an input and meta object that we're interested in and
  // any prop we pass to it through Field, in this case it's label.
  renderInput = ({ input, meta, label }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor={input.name}>{label}</label>
        <input
          {...input} // Add all properties of formProps.input as props to this input
          type="text"
          placeholder={input.name}
          id={input.name}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValuesFromReduxForm) => {
    this.props.onSubmit(formValuesFromReduxForm);
  };

  render() {
    return (
      <div className="stream-create">
        {/* When using redux-form, we have to pass our onSubmit function into this.props.handleSubmit, a function inside the 
        props passed by redux form after plugging it in the export statement */}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field name="title" component={this.renderInput} label="Enter title..." />
          <Field name="description" component={this.renderInput} label="Enter description" />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

// Form validation with redux-form: We'll return an empty error if there are none, otherwise fill it with the properties that have one.
// The property names must match the Field's name prop.
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title!';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description!';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
