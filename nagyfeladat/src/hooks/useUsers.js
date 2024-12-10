import {useCallback, useEffect, useState} from "react";
import {AXIOS_METHOD, doApiCall} from "./useApi";

export default function useUsers(prefix = "", limit = 10) {
    const [cursor, setCursor] = useState(null);
    const [users, setUsers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const apiCallCallback = useCallback((newCursor) => {
        setLoading(true);
        doApiCall(AXIOS_METHOD.POST, '/user/list', (responseData) => {
            setUsers(oldUsers => {
                if (oldUsers === false || newCursor === null) {
                    return responseData?.users;
                }
                return [...oldUsers, ...responseData?.users]
            });
            console.log(responseData?.has_more);
            console.log(responseData?.cursor);
            setCursor(responseData?.cursor);
            setHasMore(responseData?.has_more);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            console.log(errorMessage);
            setError(errorMessage);
            setUsers(false);
            setHasMore(true);
            setCursor(null);
            setLoading(false);
        }, {
            prefix,
            limit,
            cursor: newCursor
        });
    }, [setUsers, setError, setLoading, setHasMore, prefix, limit]);

    const resetUsers = useCallback(() => {
        apiCallCallback(null);
    }, [apiCallCallback]);

    useEffect(() => {
        resetUsers();
    }, [resetUsers]);


    const onLoadMore = useCallback(() => {
        apiCallCallback(cursor);
    }, [apiCallCallback, cursor]);


    return [users, loading, error, onLoadMore, hasMore, resetUsers];
}