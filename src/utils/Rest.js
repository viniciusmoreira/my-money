import { useReducer, useEffect } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
  loading: false,
  data: {}
}

const reducer = (state, action) => {
  if(action.type === 'REQUEST'){
    return {
      ...state,
      loading: true
    }
  }

  if(action.type === 'SUCCESS'){
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }

  return state;
}

const init = baseUrl => {  
 
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  
    useEffect(() => {
      dispatch({type: 'REQUEST'})
      axios
        .get(baseUrl + resource + '.json')
        .then(res => {
          dispatch({type: 'SUCCESS', data: res.data ? res.data : {}});
        })
    }, [resource]);
  
    return data;
  }

  const usePost = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  
    const post = (resource, data) => {
      dispatch({type: 'REQUEST'});
  
      axios.post(baseUrl + resource + '.json', data)
      .then(res => {
        dispatch({type:'SUCCESS', data: res.data})
      })
    }
  
    return [data, post]
  }

  const useRemove = () => {
    const [, dispatch] = useReducer(reducer, INITIAL_STATE)
  
    const remove = resource => {
      axios.delete(baseUrl + resource + '.json')
        .then(() => {
          dispatch({
            loading: false
          })
        })
    }
  
    return [remove]
  }

  return {
    useGet,
    usePost,
    useRemove
  }

}

export default init;