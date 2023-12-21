import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const addtocart = async (userId, productId, quantity) => {
    try {
        const requrl = `${backendUrl}/products/add_to_cart`;
        const reqPayLoad = {
            userId : userId,
            productId: productId,
            quantity: quantity
        };
        const response = await axios.post(requrl, reqPayLoad);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateItemQuantity = async (userId, productId, newQuantity) => {
    try {
        const requrl = `${backendUrl}/products/modify_quantity`;
        const reqPayLoad = {
            userId : userId,
            productId: productId,
            quantity: newQuantity
        };
        const response = await axios.put(requrl, reqPayLoad);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const deleteProduct = async (cartItemId) => {
    try {
        const requrl = `${backendUrl}/products/${cartItemId}`;
        const response = await axios.delete(requrl);
        return response;
    } catch (error) {
        console.log(error);
    }
}

