import {v4 as uuidv4} from 'uuid';

const userService = {
  getAllUsers: () => {
    const localValue = localStorage.getItem('Users');
    return localValue ? JSON.parse(localValue) : [];
  },

  getUser: property => {
    const localValue = localStorage.getItem('Users');
    const users = localValue ? JSON.parse(localValue) : [];

    return users.find(user => user.email === property || user.id == property);
  },

  getUserId: token => {
    const localValue = localStorage.getItem('Users');
    const users = localValue ? JSON.parse(localValue) : [];

    return users.find(user => user.accessToken === token);
  },

  createUser: user => {
    const localValue = localStorage.getItem('Users');
    const users = localValue ? JSON.parse(localValue) : [];

    const userId = users.length + 1;
    users.push({id: `${userId}`, ...user});

    localStorage.setItem('Users', JSON.stringify(users));
  },

  updateUser: user => {
    const localValue = localStorage.getItem('Users');
    const users = JSON.parse(localValue);

    const updatedUser = users.map(u =>
      u.id === user.id ? {...u, ...user} : u,
    );

    localStorage.setItem('Users', JSON.stringify(updatedUser));
  },

  logIn: formData => {
    return new Promise((resolve, reject) => {
      const {email, password} = formData;

      setTimeout(async () => {
        const user = userService.getUser(email);
        if (!user) {
          reject('Email doesn’t exist.');
          return;
        }

        if (password !== user.password) {
          reject('Enter Right Password');
          return;
        }

        const accessToken = uuidv4();

        const updatedUser = {...user, accessToken};
        userService.updateUser(updatedUser);

        resolve({success: true, access_token: accessToken});
      }, 500);
    });
  },

  signUp: formData => {
    return new Promise((resolve, reject) => {
      const {name, email, password, roles} = formData;

      setTimeout(() => {
        const user = userService.getUser(email);
        if (user) {
          reject('User Already Exists');
          return;
        }

        const accessToken = uuidv4();

        userService.createUser({name, email, password, accessToken, roles});

        resolve({success: true, access_token: accessToken});
      }, 500);
    });
  },
};

export default userService;
