export const setPaquetes = (data) => {
    return { type: 'PAQUETES_REQUEST', payload: data };
};

export const cleanPaquetes = () => {
    return { type: 'CLEAN'};
};

