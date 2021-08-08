
export const setVentas = (data) => {
    return { type: 'VENTAS_REQUEST', payload: data };
};


export const updateVentas = (data) => {
    return { type: 'UPDATE_VENTAS', payload: data };
};

