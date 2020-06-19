import {GET_NUMBERS_BASKET} from './type'

export const getNumbers = () => {
    return (dispatch) => {
        console.log("Getting to Basket")
        dispatch({
            type: GET_NUMBERS_BASKET
        })
    }
}