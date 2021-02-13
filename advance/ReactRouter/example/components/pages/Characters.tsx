import React, { FC } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router';
import AllCharacters from 'containers/templates/AllCharacters';
import SchoolCharacters from 'containers/templates/SchoolCharacters';
import HomeButton from 'containers/molecules/HomeButton';

// Routeコンポーネントのcomponent属性によってコールされているため
// propsの中に history, location, match オブジェクトが格納されている
const Characters: FC<RouteComponentProps> = ({ match }) => (
  // ここではmatchオブジェクトだけを抽出( match.path = '/characters' )
  <>
    <header>
      <h1>『SLAM DUNK』登場人物</h1>
    </header>
    <Switch>
      <Route exact path={`${match.path}`}>
        <AllCharacters />
      </Route>
      <Route path={`${match.path}/:schoolCode`}>
        <SchoolCharacters />
      </Route>
      <Redirect to="/" />
    </Switch>
    <HomeButton />
  </>
);
export default Characters;

// '/characters'にも'/characters/:schoolCodeにもマッチングしなければ'/'にリダイレクト