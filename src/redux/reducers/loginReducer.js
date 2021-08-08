

const initialState = {
    usuario: null,
    id: null,
    token: null
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return { ...initialState };
        case 'LOGIN':
            return { ...state, usuario: action.payload.usuario, id: action.payload.id, token: action.payload.token };
        default:
            return state;
    }
};

export default loginReducer;

