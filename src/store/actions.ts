import ILogin from "../interfaces/ILogin.ts";

export const enterUserCredentials = (state: ILogin, action: { payload: ILogin }): void => {
    state.username = action.payload.username;
    state.password = action.payload.password;
}