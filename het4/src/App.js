import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AllDogs from './screens/AllDogs';
import OneDog from './screens/OneDog';
import NewDog from './screens/NewDog';
import Page404 from './screens/Page404';
import {DogProvider} from './utils/data';

function App() {

  return (
    <DogProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<AllDogs/>} />
            <Route path="/dog/:id" element={<OneDog/>} />
            <Route path="/new" element={<NewDog/>} />
            <Route path="*" exact element={<Page404/>} />
          </Routes>
      </BrowserRouter>
    </DogProvider>
  );
}

export default App;
