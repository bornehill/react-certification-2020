import BaseService from './base.service';

describe('Test base service', () => {
  it('Should have custom prefix', () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const customService = new BaseService('/custom');

    expect(customService.instance.defaults.baseURL).toBe(
      `${process.env.REACT_APP_API_URL}/custom`
    );
    expect(customService.instance.defaults.headers['Content-Type']).toBe(
      'application/json'
    );
    expect(
      customService.instance.defaults.headers.common['x-auth-token']
    ).toBeUndefined();
  });

  it('Should have custom prefix and auth token', () => {
    Storage.prototype.getItem = jest.fn(() => '1234');

    const customService = new BaseService('/custom');

    expect(customService.instance.defaults.baseURL).toBe(
      `${process.env.REACT_APP_API_URL}/custom`
    );
    expect(customService.instance.defaults.headers['Content-Type']).toBe(
      'application/json'
    );
    expect(customService.instance.defaults.headers.common['x-auth-token']).toBe(
      'Bearer 1234'
    );
  });
});
