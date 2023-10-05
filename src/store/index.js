import { createStore } from 'redux';

const initialState = {
  page: 'contacts',
  contacts: [],
  selectedContact: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
      default:
      return state;
  }
};

const store = createStore(reducer);

export default store;