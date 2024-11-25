import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function Providers({children}) {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}