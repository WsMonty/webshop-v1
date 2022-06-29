const purchasedReducer = (state = [], action) => {
  switch (action.type) {
    case 'purchase':
      return (state = action.payload);
    case 'emptyPurchased':
      return (state = []);
    default:
      return state;
  }
};

export default purchasedReducer;
