interface ILogin {
    username: string;
    password: string;
    isLoggedIn: boolean;
    loginError: string;
    loading: boolean;
}

export default ILogin;