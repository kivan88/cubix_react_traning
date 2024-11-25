import './App.css';
import Registration from './screens/Registration';
import WalletLists from './screens/WalletLists';
import WalletTransactions from './screens/WalletTransactions';
import EditWallet from './screens/EditWallet';
import Page404 from './screens/Page404';
import Landing from './screens/Landing';
import {Routes, Route} from 'react-router-dom';
import Providers from './Providers';
import ButtonAppBar from './components/AppBar';

function App() {
  return (
    <Providers>
      <ButtonAppBar/>
      <Routes>
        <Route path="/" exact element={<Landing/>} />
        <Route path="/me" element={<WalletLists/>} />
        <Route path="/me/wallet/:id" element={<WalletTransactions/>} />
        <Route path="/me/wallet/:id/edit" element={<EditWallet/>} />
        <Route path="/me/wallet/new" element={<EditWallet/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="*" exact element={<Page404/>} />
      </Routes>
    </Providers>
  );
}

export default App;
