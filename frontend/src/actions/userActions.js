export const getUserDetails = (userDetails) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_DETAILS_REQUEST',
        })
        const data  = await userDetails()
        console.log(data)
        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}