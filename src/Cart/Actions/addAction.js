import {ADD_PRODUCT_BASKET} from './type'

export const addBasket = () => {
    return (dispatch) => {
        console.log("Adding to cart")
        dispatch({
            type: ADD_PRODUCT_BASKET
        })
    }
}