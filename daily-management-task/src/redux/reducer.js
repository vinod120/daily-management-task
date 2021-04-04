import {DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, POST_REQUEST, POST_SUCCESS, POST_FAILURE} from './actionCreators'
const initState = {
    isLoading: false,
    error: false,
    data: [],
}

const dataReducer = (state=initState, {type, payload})=>{
    switch (type) {
        case DATA_REQUEST:
            return{
                ...state,
                isLoading: true,
            }
        case DATA_SUCCESS:
            return{
                ...state,
                isLoading: false,
                data: payload.data
            }
        case DATA_FAILURE:{
            return{
                ...state,
                isLoading: false,
                error: true
            }
        }
        case POST_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case POST_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case POST_FAILURE:
            return{
                ...state,
                error: 'something went wrong',
                isLoading: true,
            }
        default:
            return state;
    }
}
export default dataReducer;