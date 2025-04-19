

// // const request = require('supertest');
// // const app = require('../app');
// // const db = require('../config');

// // let token = '';

// // beforeAll(done => {
// //   // Clear and setup test user
// //   db.query('DELETE FROM users WHERE username = ?', ['testuser'], () => {
// //     done();
// //   });
// // });

// // afterAll(() => {
// //   db.end(); // Close DB connection after tests
// // });

// // describe('User API', () => {
// //   it('should register a new user', async () => {
// //     const res = await request(app).post('/api/register').send({
// //       username: 'testuser',
// //       password: 'testpass'
// //     });
// //     expect(res.statusCode).toEqual(201);
// //     expect(res.body.message).toBe('User registered');
// //   });

// //   it('should login and return token', async () => {
// //     const res = await request(app).post('/api/login').send({
// //       username: 'testuser',
// //       password: 'testpass'
// //     });
// //     expect(res.statusCode).toEqual(200);
// //     expect(res.body.token).toBeDefined();
// //     token = res.body.token;
// //   });

// //   it('should fetch profile with token', async () => {
// //     const res = await request(app)
// //       .get('/api/profile')
// //       .set('Authorization', `Bearer ${token}`);
// //     expect(res.statusCode).toEqual(200);
// //     expect(res.body.username).toBe('testuser');
// //   });

// //   it('should reject access without token', async () => {
// //     const res = await request(app).get('/api/profile');
// //     expect(res.statusCode).toEqual(401);
// //   });

// //   it('should reject wrong login', async () => {
// //     const res = await request(app).post('/api/login').send({
// //       username: 'testuser',
// //       password: 'wrongpass'
// //     });
// //     expect(res.statusCode).toEqual(401);
// //   });
// // });


// const request = require('supertest');
// const app = require('../app');
// const db = require('../config');

// let token = '';

// beforeAll((done) => {
//   // Delete test user if already exists
//   db.query('DELETE FROM users WHERE username = ?', ['testuser'], (err) => {
//     if (err) return done(err);

//     // Insert test user
//     db.query(
//       'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
//       ['testuser', 'testpass', 'test@example.com'],
//       (err2) => {
//         if (err2) return done(err2);
//         done();
//       }
//     );
//   });
// });


// afterAll(() => {
//   return new Promise((resolve) => db.end(resolve));
// });

// describe('User API', () => {
//   it('should register a new user', async () => {
//     const res = await request(app).post('/api/register').send({
//       username: 'testuser',
//       password: 'testpass'
//     });
//     console.log('Register response:', res.body);
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.message).toBe('User registered');
//   }, 10000);

//   it('should login and return token', async () => {
//     const res = await request(app).post('/api/login').send({
//       username: 'testuser',
//       password: 'testpass'
//     });
//     console.log('Login response:', res.body);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.token).toBeDefined();
//     token = res.body.token;
//   }, 10000);

//   it('should fetch profile with token', async () => {
//     const res = await request(app)
//       .get('/api/profile')
//       .set('Authorization', `Bearer ${token}`);
//     console.log('Profile response:', res.body);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.username).toBe('testuser');
//   }, 10000);

//   it('should reject access without token', async () => {
//     const res = await request(app).get('/api/profile');
//     console.log('No token response:', res.body);
//     expect(res.statusCode).toEqual(401);
//   }, 10000);

//   it('should reject wrong login', async () => {
//     const res = await request(app).post('/api/login').send({
//       username: 'testuser',
//       password: 'wrongpass'
//     });
//     console.log('Wrong login response:', res.body);
//     expect(res.statusCode).toEqual(401);
//   }, 10000);
// });

const request = require('supertest');
const app = require('../app'); // adjust path as needed
const db = require('../config'); // adjust path as needed
const bcrypt = require('bcrypt');

const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
};

let token;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash(testUser.password, 10);

  await new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE username = ?', [testUser.username], (err) => {
      if (err) return reject(err);

      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [testUser.username, testUser.email, hashedPassword],
        (err2) => (err2 ? reject(err2) : resolve())
      );
    });
  });
});

afterAll(() => {
  db.end(); // Close MySQL connection after all tests
});

describe('User API', () => {
  test('should register a new user', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'newuser',
      email: 'new@example.com',
      password: 'newpassword123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('should login and return token', async () => {
    const res = await request(app).post('/api/login').send({
      username: testUser.username,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token; // Save token for later use
  });

  test('should fetch profile with token', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe(testUser.username);
  });

  test('should reject access without token', async () => {
    const res = await request(app).get('/api/profile');

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body.message).toBe('No token provided');
  });

  test('should reject wrong login', async () => {
    const res = await request(app).post('/api/login').send({
      username: testUser.username,
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid/i);
  });
});

