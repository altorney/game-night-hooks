import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import Content from 'components/main/main';
import Maintenance from 'components/Maintenance/maintenance';
import { connect } from 'react-redux';

function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        {props.loading && 'loading...'}
        {props.error && 'Sorry there was an error'}
        <Switch>
          <Route path="/" exact>
            <Content />
          </Route>
          <Route path="/maintenance">
            <Maintenance />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(App);
