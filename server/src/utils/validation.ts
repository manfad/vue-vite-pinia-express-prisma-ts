export const validateLoginInput = (username: string, password: string) => {
    if (!username || !password) {
        return 'Username and password are required';
    }

    return null;
};

export const validateRegisterInput = (
    username: string,
    email: string,
    password: string,
    name: string
) => {
    if (!username || !email || !password || !name) {
        return 'All fields are required';
    }

    if (!isValidEmail(email)) {
        return 'Invalid email format';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

    if (username.length < 3) {
        return 'Username must be at least 3 characters long';
    }

    return null;
};

const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}; 