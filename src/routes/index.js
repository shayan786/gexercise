import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import exp from './exp';
import error from './error';

export default {

  path: '/',

  // keep in mind, routes are evaluated in order
  children: [
    home,
    exp,

    // place new routes before...
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
