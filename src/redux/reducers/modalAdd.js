const modalAdd = (state = false, action) => {
console.log("🚀 ~ file: modalAdd.js ~ line 2 ~ modalAdd ~ action", action)
  switch(action.type) {
     case 'OPEN_MODAL_ADD':
       return true;
     case 'CLOSE_MODAL_ADD':
       return false;
     default:
       return state;
   }
};

export default modalAdd;