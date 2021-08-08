

const initialState = {
    paquetes: null
};

const paquetesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAN':
            return { ...initialState };
        case 'PAQUETES_REQUEST':
            return { ...state, paquetes: action.payload.destinos };
        default:
            return state;
    }
};

export default paquetesReducer;

