# Reactは非同期処理とどう戦ってきたか
* 外部APIとの通信などの副作用処理をどこでどのようにやるか
* ReactなどのJS製ライブラリは、外部との通信処理が必然的に非同期処理となる

## Reduxミドルウェア時代

### 初期：コンポーネント内で非同期処理を書く
```ts
class EnhancedMembers extends Component<{}, { users: User[] }> {
  constructor(props: {}) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount = async (): Promise<void> => {
    const response = await fetch('https://api....');

    if (response.ok) {
      const members = await response.json() as User[];
      this.setState({ members });
    }
  };
  // 省略
}
```
* コンポーネントマウント時にRESTful APIを叩く
* fetchの結果をstateに入れ、renderで表示する
* この方法だと、規模が大きくなると問題が噴出する
  * 複数のライフサイクルメソッドに同じ処理を書く必要性があり乱雑なコードになる
  * それゆえ副作用のロジックの分離も難しい
  * ロジックが密結合になると、メンテナンスコストが高まりテストも難しい
  * 取得データがコンポーネント内に閉じ込められて使い捨てせざるを得ない

### 非同期処理をReduxに任せるようになった
* Reduxはデフォルトでは同期処理しか使えなかった
* 非同期処理のミドルウェアがたくさん作られた
  * ミドルウェア：外部からdispatcherを拡張してrenderの実行前後に任意の処理を追加できるようにするもの
* 非同期処理のミドルウェア御三家
  * Redux Thunk（ダントツトップ）
  * redux-saga（Thunkの3分の1）
  * redux-observable

**< Redux Thunk >**
* thunkとは、計算の遅延評価の際に引き渡される計算の実体のこと
  * 通常Reduxではプレーンなactionしか渡せない
  * Redux Thunkを組み込めばthunkもdispatcherに渡せるようになる
  * つまり、副作用を内包した関数やPromiseをdispatchできるミドルウェアである
  * action creator内で非同期処理ができたり、他のaction creatorをdispatchできたり、複数のactionをdispatchできる
  * 以下、Thunkにおけるaction creatorのサンプル
  ```ts
  const increment = () => ({
    type: 'INCREMENT',
  });

  const delayedIncrement = () => (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
  // viewからaction creatorがdispatch(delayedIncrement())のようにコールされる
  // dispatchを引数にした関数がdispatchされてそれがdispatcher野中で実行される
  // 1秒後に'INCREMENT'がdispatchされる
  ```
* Redux Thunkのメリット(Pros)
  * 公式スタイルガイドで使用が推奨されている
  * ライブラリがシンプルでサイズも小さい
  * コードのボイラープレートが少なくて済む
  * 学習コストが低い（ように最初は見える）
* Rudex Thunkのデメリット(Cons)
  * Reduxの純粋なデータフローの在り方からかけ離れている
  * コールバック地獄に陥りやすい
  * テストが複雑になる

**< redux-saga >**
  * Thunkと同様、副作用を扱うためのReduxミドルウェア
  * 純粋なデータフローを残したまま、副作用処理を同期的に記述できる
  * テストもしやすい
  * つまり、Thunkの欠点を克服したもの
* 実際のデータフロー
    1. 実行させたい副作用を伴う非同期処理を「タスク」として登録しておく
    1. viewからactionがdispatchされる
    1. dispatcherがreducerに加えてSagaにもactionを引き渡す
    1. actionが渡されたらそれに対応するタスクが起動する
* 非同期処理を同期的に記述する関数「ジェネレータ」
```ts
function* stepTo(end, start = 1) {
  for (let n = start; n < end: n++) {
    yield n;
    // yield: 特注仕様のreturnでnext()メソッドで順次実行される
    // yieldが返す値は {value: any, done: boolean}
    // yieldががなくなったら {value: undefined, done: true}
  }
  yield end * 10;
} 

const gen = stepTo(3);
console.log(gen.next()); // Object {value: 1, done: false}
console.log(gen.next()); // Object {value: 2, done: false}
console.log(gen.next()); // Object {value: 3, done: false}
console.log(gen.next()); // Object {value: 30, done: false}
console.log(gen.next()); // Object {value: undefined, done: true}
```
* sagaの Pros and Cons
  * Pros
    * 副作用処理をアプリケーションから完全に分離できる
    * 非同期処理を同期的に書ける
    * テスタビリティが高い
  * Cons
    * コードのボイラープレートが多い
    * ジェネレータや独自のAPIコールなど、書き方に癖がある
    * 全体フローや豊富なeffectAPIなど学習コストが高い
    * ライブラリのバンドルサイズが大きい
