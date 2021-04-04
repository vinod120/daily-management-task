import { DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, POST_FAILURE, POST_SUCCESS, POST_REQUEST } from "./actionCreators"
import Axios from "axios";

export const getDataRequest = (payload)=>({
    type: DATA_REQUEST,
    payload
})

export const getDataSuccess = (payload)=>({
    type: DATA_SUCCESS,
    payload
})
export const getDataFailure = (payload)=>({
    type: DATA_FAILURE,
    payload
})

export const getData = (payload)=>(dispatch)=>{
    
    dispatch(getDataRequest(payload))
    return Axios.get('http://localhost:3000/data', {
    })
    .then(res=>{
        dispatch(getDataSuccess({data: res.data}))
    })
    .catch(err=>{
        dispatch(getDataFailure({error:err}))
    })
}

export const putData = (payload)=>(dispatch)=>{
    console.log(payload)
    const {time,date,event_title,event_details, id} = payload
    return Axios.put(`http://localhost:3000/data/${id}`, {time,date,event_title,event_details,id})
    .then(res=>{
        // dispatch(putDataSuccess(res.data))
        console.log(res)
    })
    .catch(err=>{
        dispatch(getDataFailure(err))
    })
}

export const postRequest = (payload)=>({
    type: POST_REQUEST,
    payload
})

export const postSuccess = (payload)=>({
    type: POST_SUCCESS,
    payload
})

export const postFailure = (payload)=>({
    type: POST_FAILURE,
    payload
})

export const postData = (payload)=>(dispatch)=>{
    console.log(payload)
    dispatch(postRequest(payload))
    return Axios.post('http://localhost:3000/data', payload)
    .then(res=>res.data)
    .then(res=>dispatch(postSuccess(res)))
    .catch(err=>dispatch(postFailure(err)))

}