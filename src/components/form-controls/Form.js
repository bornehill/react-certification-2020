import React, { Component } from 'react';
import Joi from 'joi';
import InputControl from './InputControl';

class Form extends Component {
  state = {
    data: {},
    errors: {},
    isLoading: false,
  };

  /** Validates the complete form */
  validate = () => {
    const joiOpts = { abortEarly: false };
    const { error } = Joi.object(this.formSchema).validate(this.state.data, joiOpts);
    if (!error) {
      return null;
    }

    let errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  /** Validate a specific property in the form */
  validateProperty = ({ name, value }) => {
    const { error } = this.formSchema[name].validate(value);

    return error ? error.message : '';
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };

    errors[input.name] = this.validateProperty(input);
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderSubmit(label) {
    return (
      <button disabled={this.state.isLoading} className="btn btn-primary" type="submit">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <InputControl
        type={type}
        label={label}
        name={name}
        defaultValue={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
