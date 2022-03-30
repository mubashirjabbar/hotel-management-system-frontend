const initialState = { userData:null };

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case "userData":
      return {
        ...state,
        userData: action.payload.userData,
      };

    default:
      return state;
  }
}
