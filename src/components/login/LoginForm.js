import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import Form from '../form-controls/Form';
import authService from '../../services/auth.service';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: { email: '', password: '' },
    isLoading: false,
  };

  formSchema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message('Enter a valid e-mail'),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
      .message('Password must be minimum 5 characters length'),
  };

  doSubmit = () => {
    this.setState({ isLoading: true });
    this.props.onLoading(true);

    authService
      .signIn(this.state.data)
      .finally(() => {
        this.setState({ isLoading: false });
        this.props.onLoading(false);
      })
      .then((resp) => {
        if (resp.data.ok) {
          this.props.onSuccess();
        }
        this.props.onError();
      })
      .catch(this.props.onError);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        {this.renderInput('email', 'E-mail', 'email')}
        {this.renderInput('password', 'Password', 'password')}
        <p className="text-sm">
          Forgot your password?{' '}
          <Link to="/signup" className="btn btn-link">
            Click to
          </Link>{' '}
          to recover it.
        </p>
        <div className="flex items-center justify-between mt-8">
          <Link to="/signup" className="btn btn-tertiary">
            Create account
          </Link>
          {this.renderSubmit('Sign in')}
        </div>
      </form>
    );
  }
}

export default LoginForm;
