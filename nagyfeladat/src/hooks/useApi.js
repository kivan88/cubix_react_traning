import {useCallback, useState, useEffect} from 'react';
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

export function useApi(method, uri, postData = undefined, deps = []) {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const apiCallCallback = useCallback((apiPostData) => {
        setLoading(true);
        doApiCall(method, uri, (responseData) => {
            setData(responseData);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            console.log(errorMessage);
            setError(errorMessage);
            setData(false);
            setLoading(false);
        }, apiPostData);
    }, [method, setData, setError, setLoading, uri]);

    useEffect(() => {
        apiCallCallback(postData);
    // eslint-disable-next-line
    }, [apiCallCallback, JSON.stringify(postData), ...deps]);

    return [data, loading, error, apiCallCallback];
}

export default useApi;