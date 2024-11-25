import React, {useCallback, useContext, useState} from 'react';
import ConfirmationModal from '../components/ConfirmationModal';

const ModalContext = React.createContext();
ModalContext.displayName = 'ModalContext';

export const MODALS = {
    'NONE': 'NONE',
    'CONFIRM_DELETE': 'CONFIRM_DELETE'
};

export function Modals() {
    return (
        <ModalContext.Consumer>
            {(context) => {
                const onClose = () => context.showModal(MODALS.NONE);
                switch (context.currentModal){
                    case MODALS.CONFIRM_DELETE:
                        return <ConfirmationModal onClose={onClose}/>
                    case MODALS.NONE:
                    default:
                        return null;
                }
            }}
        </ModalContext.Consumer>
    )
}

export function ModalContextProvider({children}) {
    const [currentModal, setCurrentModal] = useState(false);

    const showModal = useCallback(
        (newModal) => {
            setCurrentModal(newModal);
        }, [setCurrentModal]);

    return (
        <ModalContext.Provider value={{currentModal, showModal}}>
            {children}
            <Modals/>
        </ModalContext.Provider>
    )
}

export function useModals() {
    return useContext(ModalContext);
}