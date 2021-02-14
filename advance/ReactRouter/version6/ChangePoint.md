### バージョン５系から6系への変更点
* ベースコードがTypeScriptに書き直された
  * コードの整理により、react-router・react-router-domのパッケージ容量が半減
  * インストールコマンド: `yarn add react-router react-rouer-dom history`
* `Switch`の廃止,`Routes`の導入
  * Switch: マッチしたRouteがあり次第、それ以降の評価をせず処理を抜ける
  * Routes: 最後まで評価した上で、ベストマッチするRouteにルーティングされる
  * 可読性を最優先に並べることができる
  * 新規追加や書き換えを行っても既存のルールが壊れにくい
* 一箇所にルーティングルールを集約して記述可能になった
* Routes内のすべてのRouteおよびLinkのパスが、相対パスで記述可能になった

5系の場合
```ts
const App: FC = () => (
  <Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/users" component="Users" />
  </Switch>
);

const Users: FC<RouteComponentProps> = ({ match }) => (
  <div>
    <nav>
      <Link to={`${match.url}/me`}>My Profile</Link>
    </nav>
    <Switch>
      <Route path={`${match.path}/me`}><OwnUserProfile /></Route>
      <Route path={`${match.path}/:id`}><UserProfile /></Route>
    </Switch>
  </div>
);
```
6系の場合
```ts
const App: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="users/*" element={<Users />} />
  </Routes>
);

const Users: FC = () => (
  <div>
    <nav>
      <Link to="me">My Profile</Link>
      // 相対パスが使えることによりmatchオブジェクトの取り回しが消える
    </nav>
    <Routes>
      <Route path=":id" element={<UserProfile />} />
      <Route path="me" element={<OwnUserProfile />} />
    </Routes>
  </div>
);
```

さらにnested routesで集約
```ts
const App: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="users" element={<Users />}>
      <Route path="me" element={<OwnUserProfile />} />
      <Route path=":id" element={<UserProfile />} />
    </Route>
  </Routes>
);

const Users: FC = () => (
  <div>
    <nav>
      <Link to="me">My Profile</Link>
    </nav>
    <Outlet />
  </div>
);
```

* Routeの使い方が、相対パス可能の他にもかなり変わった
  * `element={<MyComponent />}`で対象コンポーネント指定
  * 前方一致ではなく完全一致になった。
    * ただしネストしている場合は、親ルートのマッチングは前方一致になる
  * exact および strict 属性が廃止。
  * 正規表現が正規表現が使えなくなり、現状は「*」だけがワイルドカードとして使用可能
  * 大文字・小文字を区別したい場合は caseSensitive 属性を指定する

* Historyオブジェクトの廃止
  * 履歴系操作はHooksのuseNavigationで返されるnavigate関数に集約
  * navigate関数は、数値の引数を与えると、『戻る・進む』系の操作になり、文字列またはPartialPath型のオブジェクトの場合はリダイレクト系の操作になる
  * 後者は第2引数に { replace?: boolean; state?:
object | null } 型のオプションを与えることができる。これによって history.replace('/') は
navigate('/', { replace: true }) と書き換えられる

* Redirectの廃止
  * 代わりにNavigateを使う
  * デフォルトでは履歴を上書きせず、replace属性を与えることで変更する
  ```ts
  <Navigate to=`/Home` replace />
  ```

v5での履歴操作
```ts
import { useHistory, Redirect } from 'react-router-dom';

const Direction: FC<{ shouldGoHome: boolean }> = ({ shouldGoHome }) => {
  const history = useHistory();
  if (shouldGoHome) history.push('/');
  return (
    <>
      <button onClick={() => history.go(-2)}>2つ戻る</button>
      <button onClick={history.goBack}>戻る</button>
      <button onClick={history.goForward}>進む</button>
      <button onClick={() => history.go(2)}>2つ進む</button>
    </>
  );
};
```

v6での履歴操作
```ts
import { useNavigate, Navigate } from 'react-router-dom';

const Direction: FC<{ shouldGoHome: boolean }> = ({ shouldGoHome }) => {
  const navigate = useNavigate();
  if (shouldGoHome) navigate('/');
  return (
    <>
      <button onClick={() => navigate(-2)}>2つ戻る</button>
      <button onClick={() => navigate(-1)}>戻る</button>
      <button onClick={() => navigate(1)}>進む</button>
      <button onClick={() => navigate(2)}>2つ進む</button>
    </>
  );
};
```

* これらはSuspense導入による影響が大きい
  * HistoryやRedirectは、Suspenseと相性が悪い

* ルーティングルールがシンプルに書けるようになるからだけじゃなく、React本体の新しい機能への対応という理由からもv6に移行したほうが良い
