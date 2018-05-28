import React from 'react';
import { Router, Route } from 'dva/router';
import main from './components/main';
import special from './components/special';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={main} />
      <Route path="/special/:id" component={special} />
    </Router>
  );
}

export default RouterConfig;
