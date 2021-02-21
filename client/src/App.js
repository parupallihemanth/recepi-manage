import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import AllRecipes from "./Pages/AllRecipesPage";
import ProfilePage from "./Pages/ProfilePage";
import Home from "./Components/Home";
import ResetPassword from "./Pages/ResetPasswordPage";
import Footer from "./Components/FooterComponent";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/profile' exact component={ProfilePage} />
          <Route path='/allRecipes' component={AllRecipes} />
          <Route path='/resetpassword/:id' component={ResetPasswordPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
