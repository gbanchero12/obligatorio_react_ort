const initialState = { contador: 0 };

const reducer2 = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENTAR':
      return { ...state, contador: state.contador + 1 };
    default:
      return state;
  }
};

export default reducer2;

