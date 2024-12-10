import {useCallback, useEffect, useState} from "react";
import {AXIOS_METHOD, doApiCall} from "./useApi";

export default function useTransactions(wallet_id = "", limit = 5) {
    const [cursor, setCursor] = useState(null);
    const [transactions, setTransactions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const apiCallCallback = useCallback((newCursor) => {
        setLoading(true);
        doApiCall(AXIOS_METHOD.POST, '/transactions', (responseData) => {
            setTransactions(oldTransactions => {
                if (oldTransactions === false || newCursor === null) {
                    return responseData?.transactions;
                }
                return [...oldTransactions, ...responseData?.transactions]
            });
            setCursor(responseData?.cursor);
            setHasMore(responseData?.has_more);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            setError(errorMessage);
            setTransactions(false);
            setHasMore(true);
            setCursor(null);
            setLoading(false);
        }, {
            wallet_id,
            limit,
            cursor: newCursor
        });
    }, [setTransactions, setError, setLoading, setHasMore, wallet_id, limit]);

    const resetTransactions = useCallback(() => {
        apiCallCallback(null);
    }, [apiCallCallback]);

    useEffect(() => {
        resetTransactions();
    }, [resetTransactions]);


    const onLoadMore = useCallback(() => {
        apiCallCallback(cursor);
    }, [apiCallCallback, cursor]);


    return [transactions, loading, error, onLoadMore, hasMore, resetTransactions];
}