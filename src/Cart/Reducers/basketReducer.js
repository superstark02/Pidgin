import { ADD_PRODUCT_BASKET, GET_NUMBERS_BASKET } from '../Actions/type'
const initialState = {
    basketNumber: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_BASKET:
            return {
                basketNumber: state.basketNumber + 1
            }
        case GET_NUMBERS_BASKET:
            return {
                ...state
            }
        default:
            return state;
    }
} 