import './App.css';
import { BrowserRouter , Switch, Route, useHistory } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
