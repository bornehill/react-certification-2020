import jwt from 'jsonwebtoken';
import BaseService from './base.service';

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  signIn(loginInfo) {
    const requestConfig = {
      transformResponse: [
        (data) => {
          const innerData = JSON.parse(data);
          if (innerData.ok) {
            localStorage.setItem('token', innerData.data.token);
            this.instance.defaults.headers.common[
              'x-auth-token'
            ] = `Bearer ${innerData.data.token}`;
          }

          return innerData;
        },
      ],
    };

    return this.instance.post('', loginInfo, requestConfig);
  }

  signOut() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    try {
      const decoded = jwt.verify(token.trim(), process.env.REACT_APP_JWT_SECRET);

      if (Date.now >= decoded.exp * 1000) {
        this.signOut();
        return { message: 'Invalid token', authenticated: false };
      }

      return { ...decoded, authenticated: true };
    } catch (err) {
      this.signOut();
      return { message: 'Invalid token', authenticated: false };
    }
  }

  userMenu() {
    return this.instance.get('/menu');
  }
}

export default new AuthService();
