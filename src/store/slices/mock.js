// mock.js
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Create a mock adapter instance
const mock = new MockAdapter(axios);

// Setup mock POST request
mock.onPost("http://localhost:8080/api/v1/auth/register").reply(200, {
    token: "fake_token"
});

export default mock;
