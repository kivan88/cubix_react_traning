// import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://proud-mode-ea75.karancsivan88.workers.dev';

export const AXIOS_METHOD = {
    'GET': 'GET',
    'POST': 'POST',
    'PUT': 'PUT',
    'PATCH': 'PATCH',
    'DELETE': 'DELETE',
};

let authToken = false;

export function setApiToken(newToken) {
    return authToken = newToken;
};

export function doApiCall(method, uri, onSuccess, onFailure = false, data ={}) {
    axios({
        method,
        url: `${BASE_URL}${uri}`,
        data: data,
        headers: authToken !== false ? {'Authorization': `Bearer ${authToken}`} : {},
    }).then(res => {
        onSuccess(res.data);
    }).catch(err => {
        console.log(err);
        if (onFailure === false) {
            return;
        }
        onFailure(err?.response?.data?.error, err);
    });
}

export function doApiCall2(method, uri, onSuccess, onFailure = false) {
    axios({
        method,
        url: `${BASE_URL}${uri}`,
        headers: authToken !== false ? {'Authorization': `Bearer ${authToken}`} : {},
    }).then(res => {
        onSuccess(res.data);
    }).catch(err => {
        console.log(err);
        if (onFailure === false) {
            return;
        }
        onFailure(err?.response?.data?.error, err);
    });
}

// function useApi(endpoint) {
//     const [loading, setLoading] = useState(true);
//     const [responseData, setResponseData] = useState(false);

//     useEffect(() => {
//         setLoading(true);

//         const controller = new AbortController();
//         axios.get(`${BASE_URL}${endpoint}`, { 
//             signal: controller.signal
//         }).then(({data}) => {
//             setResponseData(data);
//             setLoading(false);
//         }).catch(err => {
//             setLoading(false);
//             if (axios.isCancel(err)) {
//                 return;
//             }
//             setResponseData(false);
//             console.log(err);
//         });

//         return () => {
//             controller.abort();
//         }
//     }, [endpoint]);

//   return [responseData, loading];
// }

// export default useApi;