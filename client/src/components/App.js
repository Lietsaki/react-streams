import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from './streams/StreamList';
import StreamEdit from './streams/StreamEdit';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

// NOTE: BrowserRouter vs HashRouter: The latter prevents the browser from reloading the page as it doesn't send a new request
// to the server, it allows the frontend to handle the navigation. (ex. you send "www.mywebsite.com/#/person/john"
// the server gets "www.mywebsite.com". As a result the server will return the pre # URL response, and then the
// post # path will be handled by your client side app, such as to move to a certain section in a documentation website,
// or just to show another component on screen.
// With BrowserRouter, we can also move between links without reloading, but if the route exists on your client
// and not on your server, a 404 error will be thrown unless your server is configured not to do so. By default,
// BrowserRouter will return the index.html file when an unknown route is hit.

// const page1 = () => {
//   return (
//     // DON'T USE <a> to navigate in react router - It'll reload the page and dump all our redux state data
//     <div className="p1">
//       <p>Page 1</p>
//       {/* <a href="/pagetwo">go to page 2</a> */}
//       <Link to="/pagetwo">go to page 2</Link>
//     </div>
//   );
// };
// const page2 = () => {
//   return (
//     <div className="p2">
//       <p>Page p2</p>
//       <Link to="/">go to page 1</Link>
//     </div>
//   );
// };

const App = () => {
  return (
    <div className="app ui container">
      {/*Instead of allowing BroserRouter to use its own browser history, we'll pass our own. However, BrowserRouter 
      does not allow this. In order to use our own history object, we'll use Router instead. This is done to 
      implement programamtic navigation (for example, redirecting users to the Streams page after creating a new stream). */}
      <Router history={history}>
        {/* What the 'exact' keyword does in react router is to match only exact routes. For example, '/pagetwo'
         also match page one, because it includes '/'. With exact, it would only match page two.
         NOTE: All elements that use <Link> (Header in this case) must be within BrowserRouter/Router. */}
        <div>
          <Header path="/" />
          {/* Use switch to prevent the router from displaying two components in streams/new and streams/:id */}
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
