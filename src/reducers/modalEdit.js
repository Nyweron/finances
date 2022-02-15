const modalEdit = (state = false, action) => {
  switch(action.type) {
     case 'OPEN_MODAL_EDIT':
       return true;
     case 'CLOSE_MODAL_EDIT':
       return false;
     default:
       return state;
   }
};

export default modalEdit;