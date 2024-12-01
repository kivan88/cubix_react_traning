import './App.css';
import Registration from './screens/Registration';
import WalletLists from './screens/WalletLists';
import WalletTransactions from './screens/WalletTransactions';
import EditWallet from './screens/EditWallet';
import Page404 from './screens/Page404';
import Landing from './screens/Landing';
import {Navigate,Routes, Route} from 'react-router-dom';
import Providers from './Providers';
import ButtonAppBar from './components/AppBar';
import {useAuth} from './hooks/useAuth';

function ProtectedPage({children}) {
  const {authToken} = useAuth();
  if (authToken === false) {
    return <Navigate to="/"/>;
  }

  return children;
}

function App() {
  return (
    <Providers>
      <ButtonAppBar/>
      <Routes>
        <Route path="/" exact element={<Landing/>} />
        <Route path="/me" element={<ProtectedPage><WalletLists/></ProtectedPage>} />
        <Route path="/me/wallet/:id" element={<ProtectedPage><WalletTransactions/></ProtectedPage>} />
        <Route path="/me/wallet/:id/edit" element={<ProtectedPage><EditWallet/></ProtectedPage>} />
        <Route path="/me/wallet/new" element={<ProtectedPage><EditWallet/></ProtectedPage>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="*" exact element={<Page404/>} />
      </Routes>
    </Providers>
  );
}

export default App;
