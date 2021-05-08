const initialState = {
  name: "",
  email: "",
  contact: "",
  dob: "",
  role: ""
};
function Reducer(state = initialState, action) {
  switch (action.type) {
    case "submit":
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export default Reducer;
