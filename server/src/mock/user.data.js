const  MOCK_DATA = {
    NEW_VALID_USER: {
        fullName: 'Mock User',
        username: 'mockuser',
        email: 'mockuser@gmail.com',
        password: 'Password1!',
    },
    LOGIN_VALID_USER: {
        username: 'mockuser',
        password: 'Password1!',
    },
    VALID_USER_DIFFERENT_PASSWORD: {
        username: 'mockuser',
        password: 'DifferentPassword1!'
    },
    TEST_USER: {
        _id: '6447ee1c12ccee59ffa0cc52',
        fullName: 'John Doe',
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'Password1!',
    }
}

export { MOCK_DATA };
