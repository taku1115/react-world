### SPAにおけるRouting
* SPAでは、初回リクエストに対してURLにかかわらずアプリケーション全体のJSが返される
* 2回目以降は、動的にDOMを書き換えることでページ遷移をしているように見せている
* URL書き換えが伴うページ遷移も、リクエストがサーバーに行くことなくクライアントサイドで完結する
* 擬似的なページ遷移とともに、ブラウザのセッション履歴を同期させる

## デファクトスタンダード : React Router
5系と6系は別物と捉えるべき

### React Router (5系)
* インストール
```
$ yarn add react-router react-router-dom
```
* プロバイダをトップレベルで設定
src/index.tsx
```ts
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter> // 各種APIが下の階層で使えるようになる
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
```
* プロバイダコンポーネントには4種類ある
  * BrowserRouter : 一般的なSPA開発はこれでOK
  * HashRouter : URLに＃がつく機能を提供
  * StaticRouter : SSRで用いる
  * MemoryRouter : ほぼ使うことなし

* プロバイダコンポーネントの役割
  * LinkタグやRedirectタグが使える
  * match, location, historyなどのオブジェクトにアクセス可能となる
 
* Routeコンポーネント
```ts
import { Route } from 'react-router';

const App: FC = () => {
  <>
    <p>Welcome!</p>
    <Route exact path="/" component={Home}>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/contact">
      <Contact address="abc@company.com" />
    </Route>
  </>
}
// pathは絶対パスを使用
// デフォルトは前方一致
// exactは完全一致
// exactを使わないと、Homeコンポーネントが /about と /contact にもマッチする
// strictは末尾のスラッシュの有無を厳密にする
// sensitiveは大文字小文字を区別する
```
* Routeが増えた時のためのSwitchコンポーネント
```ts
const App: FC = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/user/:userId">
      <User />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);
```
初回のマッチでルーチンを抜けるため、複数マッチのリスクを回避できるため、RouteとSwitchはセットで使うべき

* リダイレクトを実行するためのRedirectコンポーネント
```ts
import { Redirect, Route, Switch } from 'react-router';

const App: FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect from="/user/profile/:userId" to="/user/:userId" />   
    <Route path="/user/:userId" component={User} />
    <Redirect push to="/" />
  </Switch>
)
// fromでマッチングしてtoにリダイレクト
// fromがなければ問答無用でリダイレクト
```

* リンク機能を提供するLinkコンポーネント
```ts
import { Link } from 'react-router-dom';
// 省略
  <ul>
    <li>
      <Link to="/">トップページ</Link>
    </li>
    <li>
      <Link to="{{
        pathname: '/contact',
        search: '?from=here'
        hash: '#subject',
        state: { secretCode: '8yUfa9KECH' },
      }}">
        お問い合わせ
      </Link>
      <li>
        <Link to="/anywhere" replace>
          今ここではないどこか
        </Link>
      </li>
    </li>
  </ul>
// 省略
// aタグはリンクを踏んだ瞬間にReactRouter管轄外となり履歴が消えてしまう
```

* 4つのHooks API
  * useHistory
  ```ts
  import React, { FC } from 'react'
  import { useHistory } from 'react-router-dom'

  const historyButtons: FC = () => {
    const history = useHistory();
    return (
    // goBack(): 一つ前に戻るメソッド
    <button type="button" onClick={() => history.goBack()}>
    戻る
    </button>
    // goForward(): 一つ先に進むメソッド
    <button type="button" onClick={() => history.goForward()}>
    進む
    </button>
    // push(): 指定パスに移動するメソッド
    <button type="button" onClick={() => history.push("/")}>
    トップページへ
    </button>
    );
  };

  export default historyButtons;
  // その他の要素
  // length: スタックされている履歴の数
  // action: 直近に実行されたアクションの種類（push,replace,pop)
  // replace(): 指定パスにリダイレクトするメソッド（現ページの履歴消える）
  // go(): 引数で指定した番号の履歴に移動するメソッド
  ```
  * useLocation
  ```ts
  import React, { FC, useEffect } from 'react';
  import { Switch, useLocation } from 'react-router-dom';
  import ReactGA from 'react-ga';

  const App: FC = () => {
    const location = useLocation();
    // locationオブジェクトにはその時点でのURL情報が格納されている
    // SPAではリクエストがサーバーに行かずGoogleAnalytics等が使えない問題への対応策
    useEffect(() => {
      // サーバーへページ情報を送信する処理
      ReactGA.pageview(location.pathname + location.search);
    },[location.key])

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user/:userId" component={User} />
        <Route component={NotFound} />
      </Switch>
    )
  }
  // locationオブジェクトの構造
  // URL: https://example.com/user/taku?from=user-list#friends の例
  {
    pathname: '/user/taku',
    search: '?from=user-list',
    hash: '#friends',
    state: {
    [secretKey]: '9qWV408Zyr',
    },
    key: '1j3qup', // locationオブジェクトごとに生成されるユニークな文字列
  }
  ```
  * useParams / useRouteMatch
  ```ts
  // どちらもmatchオブジェクトをハンドリングするためのAPI
  import React, { FC } from 'react';
  import { useParams, useRouteMatch } from 'react-router-dom'

  const User: FC = () => {
    const { userId } = useParams();
    const match = useRouteMatch();

    // アクセスしたパスが /user/taku の場合
    console.log(userId);
    // taku
    // matchオブジェクトからURLパラメーターのみを抽出
    
    console.log(match); 
    // {
    //   path: "/user/:userId",
    //   url: "/user/taku",
    //   isExact: true,
    //   params: {
    //     userId: "taku",
    //   }
    // }
    // matchオブジェクトをそのまま取得
    
    // useRouteMatchでuseParamsと同じことをする場合
    const match = useRouteMatch();
    const { userId } = match.params as { userId: string};
    // useParamsは上記を１行でかける便利なAPI
  }
  ```