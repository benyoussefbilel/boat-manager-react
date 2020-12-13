
export const actionTypes = {
  Getboats: "[Getboats] Action",
 
};

const initialBoatsState = {
  boats: []
  
};

export const reducer = ((state = initialBoatsState, action) => {
    switch (action.type) {
      case actionTypes.Getboats: {
        const  boats   = action.payload;

        return  boats ;
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getboats: (boats) => ({ type: actionTypes.Getboats, payload:  boats }),
  
};

