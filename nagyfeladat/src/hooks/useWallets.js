import {useCallback, useEffect, useState} from "react";
import {AXIOS_METHOD, doApiCall} from "./useApi";

// export function deleteWallet(wallet_id) {
//     const [transactions, error2, onLoadMore, hasMore] = useTransactions(wallet_id,1);

    // check for transactions
    // while (hasMore) {
    //     onLoadMore();
    // };
    // delete transactions if exists
    
    // transactions.forEach((transaction) => {
    //     doApiCall(AXIOS_METHOD.DELETE, `/transaction/${transaction.id}`, _unusedDeletedTransaction, 
    //     (message) => {
    //         setError(message);
    //     }, transaction.id);
    // });

    // delete wallet
    // doApiCall(AXIOS_METHOD.DELETE, `/wallet/${id}`, _unusedDeletedWallet, 
    // (message) => {
    //     setError(message);
    // }, id)
// };

export default function useWallets() {
    const [wallets, setWallets] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const apiCallCallback = useCallback(() => {
        setLoading(true);
        doApiCall(AXIOS_METHOD.GET, '/wallets', (responseData) => {
            setWallets(responseData);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            setError(errorMessage);
            setWallets(false);
            setLoading(false);
        });
    }, [setWallets, setError]);

    const resetWalletList = useCallback(() => {
        apiCallCallback();
    }, [apiCallCallback]);

    useEffect(() => {
        resetWalletList();
    }, [resetWalletList]);

    return [wallets, loading, error, resetWalletList];
}