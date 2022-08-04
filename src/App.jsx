import { useContext } from 'react';
import { UserContext } from './context/userContext';
import AppRouter from './router/AppRouter';
import Loading from './components/Loading';

function App() {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <Loading />;
  }

  return <AppRouter></AppRouter>;
}

export default App;
