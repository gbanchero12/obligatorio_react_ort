const initialState = { valorTestReducer2: 2 };

const reducer2 = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCION':
      return { ...state };
    default:
      return state;
  }
};

export default reducer2;
