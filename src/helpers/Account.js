class Account {
  static get() {
    try {
      return JSON.parse(localStorage.getItem('user') || {});
    } catch (e) {
      return {};
    }
  }

  static set(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static deleteInfo() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }
}

export default Account;
