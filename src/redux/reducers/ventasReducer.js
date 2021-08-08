

const initialState = {
    ventas: null,
    updateVentas: false
};

const ventasReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAN':
            return { ...initialState };
        case 'VENTAS_REQUEST':
            return { ...state, ventas: action.payload.ventas, updateVentas: false };
        case 'UPDATE_VENTAS':
            return { ...state,  updateVentas: action.payload.updateVentas };
        default:
            return state;
    }
};

export default ventasReducer;

