import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// CSS Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import PrivateRoute from './components/container/PrivateRoute';
import Dashboard from './components/container/Dashboard';
import Login from './components/presentation/Login';
import SignUp from './components/presentation/SignUp';
import { AuthProvider } from './components/presentation/Auth';

function App() {

  /*** State Variables ***/

  /*** Lifecycle Actions ***/

  /*** Helper Functions ***/

  return (
	<AuthProvider>
	  <Router>
		<div className="App">
		  <PrivateRoute exact path='/' component={Dashboard} />
		  <Route exact path='/login' component={Login} />
		  <Route exact path='/signup' component={SignUp} />
		</div>
	  </Router>
	</AuthProvider>
  );
}

export default App;
