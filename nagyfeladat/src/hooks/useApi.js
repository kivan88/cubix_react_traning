import { useState, useEffect } from 'react';
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

export function doApiCall(method, uri, onSuccess, onFailure = false, data = undefined) {
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

export function useApi(method, uri, data, deps = []) {
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        doApiCall(method, uri, (data)=>{
            setResponseData(data);
            setError(false);
            setLoading(false);
        }, (apiError)=>{
            setResponseData(false);
            setError(apiError);
            setLoading(false);
            console.log(apiError);
        }, data);

        return () => {
            controller.abort();
        }
    // eslint-disable-next-line 
    }, [uri, JSON.stringify(data), method, ...deps]);

  return [responseData, loading, error];
}

export default useApi;