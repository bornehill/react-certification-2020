import React, { useState } from 'react';
import LoginForm from './LoginForm';
import LoadingBar from '../common/LoadingBar';
import Header from '../common/Header';

const LoginView = (login) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const handleSuccess = () => {
    login.history.push('/');
  };

  const handleError = () => {
    setHasLoginFailed(true);
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);

    if (isLoading) {
      setHasLoginFailed(false);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="w-full h-screen card card-white md:max-w-md md:rounded-sm md:mx-auto md:h-auto relative">
          {isLoading && <LoadingBar />}
          <div className="p-10">
            <h1 className="text-center text-2xl font-emphasis">Sign in</h1>
            {hasLoginFailed && (
              <p className="mt-2 text-sm p-2 text-white bg-red-700">
                Invalid e-mail or password
              </p>
            )}
            <LoginForm
              onSuccess={handleSuccess}
              onError={handleError}
              onLoading={handleLoading}
            />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default LoginView;
