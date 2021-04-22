import AuthService from './auth.service';

describe('Test auth service', () => {
  it('Should be initialized properly', () => {
    expect(AuthService.instance.defaults.baseURL).toBe(
      `${process.env.REACT_APP_API_URL}/auth`
    );
    expect(AuthService.instance.defaults.headers['Content-Type']).toBe(
      'application/json'
    );
    expect(AuthService.instance.defaults.headers.common['x-auth-token']).toBeUndefined();
  });

  it('Should sign in success', () => {
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
    AuthService.instance.post = jest.fn((url, request, config) => {
      config.transformResponse[0].call(
        this,
        '{"statusCode": 200, "ok": true, "data": { "token": "xrs-token"} }'
      );
    });
    const lstorage = spyOn(Storage.prototype, 'setItem');

    expect(AuthService.instance.defaults.baseURL).toBe(
      `${process.env.REACT_APP_API_URL}/auth`
    );
    expect(AuthService.instance.defaults.headers['Content-Type']).toBe(
      'application/json'
    );

    AuthService.signIn({ user: 'userName' });

    expect(lstorage).toHaveBeenCalled();
    expect(lstorage).toBeCalledWith('token', 'xrs-token');
  });

  it('Should sign in failed', () => {
    Storage.prototype.setItem = jest.fn();
    AuthService.instance.post = jest.fn((url, request, config) => {
      config.transformResponse[0].call(
        this,
        '{"statusCode": 401, "data": { "message": "User/Password invalid"} }'
      );
    });
    const lstorage = spyOn(Storage.prototype, 'setItem');

    expect(AuthService.instance.defaults.baseURL).toBe(
      `${process.env.REACT_APP_API_URL}/auth`
    );
    expect(AuthService.instance.defaults.headers['Content-Type']).toBe(
      'application/json'
    );

    AuthService.signIn({ user: 'userName' });

    expect(lstorage).not.toHaveBeenCalled();
  });

  it('Should sign out', () => {
    Storage.prototype.removeItem = jest.fn();
    const lstorage = spyOn(Storage.prototype, 'removeItem');
    AuthService.signOut();

    expect(lstorage).toHaveBeenCalled();
    expect(lstorage).toBeCalledWith('token');
  });

  it('Should get menu', () => {
    AuthService.instance.get = jest.fn();
    const lstorage = spyOn(AuthService.instance, 'get');
    AuthService.userMenu();

    expect(lstorage).toHaveBeenCalled();
    expect(lstorage).toBeCalledWith('/menu');
  });
});
