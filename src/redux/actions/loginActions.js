export const loginAction = (data) => {
    return { type: 'LOGIN', payload: { usuario: data.usuario, id: data.id, token: data.apiKey } };
};

export const logoutAction = () => {
    return { type: 'LOGOUT' };
};

