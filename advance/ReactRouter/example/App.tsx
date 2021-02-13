import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import Home from 'components/pages/Home';
import Characters from 'containers/pages/Characters';

const App: FC = () => {

  const { hash, pathname } = useLocation();
  const { action } = useHistory();

  useEffect(() => {
    if (!hash || action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, hash, pathname]);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/characters" component={Characters} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

// SPAの注意点
// ページ遷移時にブラウザのスクロール位置が変わらない
// useEffectで、コンポーネントの初回レンダリング時に強制的にトップにスクロールさせている