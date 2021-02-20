import React, { FC, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RootState } from '../rootReducers'


const Auth = lazy(() => import('../features/auth/Auth'))
const Home = lazy(() => import('../features/auth/Home'))


const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Suspense fallback={<p>Loading...</p>}>
              {
                isLoggedIn ? <Home /> : <Auth />
              }
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}


export default App;