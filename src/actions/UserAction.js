import * as UserRequest from '../api/UserRequest'
export const updateUser = (id,formData) =>async(dispatch) =>{
    dispatch({type:'UPDATE_START'})
    try {
        const newPost = await UserRequest.updateUser(id,formData);
        dispatch({type:'UPDATE_SUCCESS', data:newPost});
    } catch (error) {
        console.log(error)
        dispatch({type:'UPDATE_FAIL'})

    }
}

export const followUser = (id, formData) =>async(dispatch) =>{
    const follow = await UserRequest.followUser(id,formData);
    dispatch({type:'FOLLOW_USER'})
}