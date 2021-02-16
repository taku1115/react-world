# Redux Style Guide

* Reduxはコードがカオスになりやすい
* 公式なガイドラインとして『Redux Style Guide』が発表された
* 設計パターンや開発ベストプラクティスなどの寄せ集め

**以下は、一旦押さえておくべきルールの抜粋**

## 必須のルール
* stateを直接書き換えない
* reducerに副作用を持たせない（純粋関数であるべき）
    * 副作用の生じる処理とは、、、
      * 外部システムとの通信
      * reducerの外の変数の書き換え
      * ランダムな値を不要にstoreに渡す など
* シリアライズできない値をstateやactionに入れない
    * Promiseや関数など、Json.stringfy()したときにあたいが同一でないものをstateやactionに入れてはいけない
    * テストやデバッグが困難になる
* storeは一つのアプリにつき一つだけ

## Actionに関するルール
* actionをsetterではなくイベントとしてモデリングする
```ts
// setterの例
{
  type: 'user/setName',
  payload: { id: 38792, name: 'Taku' },
},
{
  type: 'user/setBirthday',
  payload: { id: 38792, birthday: new Date('1996-11-15T09:00:00') },
}
// 発生したイベントとして表現
{
  type: 'user/profileUpdated',
  payload: { id: 38792, name: 'Taku', birthday: new Date('1996-11-15T09:00:00') },
}
// イベントとして扱う方が、 dispatchされるactionの数が減り、actionログも見やすくなる上、次の命名ルールも同時に満たせる
```
* actionの名前は意味を的確に表現したものとする
* actionタイプ名を「ドメインモデル/イベント種別」のフォーマットで書く
* actionをFSA(Flux Standard Action)に準拠させる
  * actionはtype, payload, error, metaの4つの要素で構成される
  ```ts
  type ActionType = {
    type: string;
    payload?: any;
    error?: boolean;
    meta?: { [key: string]: any };
  };
  // エラーを表現するアクションならerrorをtrueにし、error情報をmetaに格納する
  // 正常系はほぼtypeとpayloadしか使わない
  // dataは上の階層にそのまま入れず、payloadに格納するのを徹底すること
  ```
* dispatchするactionは直に書かずaction creatorを使う
  * dispatch({ type: 'counter/ increment' })としない

## ツールやデザインパターンに関するルール
* Reduxのロジックを書くときは`Redux Toolkit`を使う
* イミュータブルな状態の更新には`Immer`を使う
  * Immer: オブジェクトのイミュータブルな更新を簡単にしてくれるライブラリ(以下に使用例あり)
* デバッグには`Redux Devtools`を使う
  * タイムトラベル・デバッギングが可能
* ファイル構造には`Feature Folder`または`Ducksパターン`を適用する
  ```ts
  // Feature Folder
  src/
    features/
      user/
        user-actions.ts
        user-reducer.ts
      article/
        article-actions.ts
        article-reducer.ts
    ︙
  // サービスにおける関心領域ごとにディレクトリを区切る

  // Ducks Pattern
  src/
    ducks/
      user.ts
      article.ts
    ︙
  // ドメインごとにactionやreducerを単一のファイルにまとめる
  ```

### Immer
ブログ記事を表現するオブジェクトにおいて、特定のコメントを書き換えた新しいオブジェクトを作りたい場合、通常はスプレッド構文を使う
```ts
const article = {
  id: '83214',
  authorId: '3297',
  title: 'My super awesome article',
  body: 'Wow! I wrote such a great article...',
  comments: {
    '213974': {
      id: '213974',
      commenterId: 10983,
      body: 'You are a genius!',
    },
    // 省略
  },
};

const updatedArticle = {
  ...article,
  comments: {
    ...article.comments,
    '213974': {
      ...article.comments['213974'],
      body: 'Yaaah!'
    },
  },
};
// 階層が深くなるとスプレッド構文が多くなって可読性が低下する
// バグも混入しやすくなる
```
Immerを使うと以下のように可読性を高く保って書ける
```ts
import produce from 'immer';

const updatedArticle = produce(article, draftArticle => {
  draftArticle.comments['213974'].body = 'Yaaah!';
});
// ライブラリを使うとパフォーマンスは悪化しがちだが、Immerは多くのケースでスプレッド構文より高速
```

## その他設計に関するルール
* どの状態をどこに持たせるかは柔軟に考える
  * 「全ての状態をstore内stateに保持するべき」は誤解
  * タブなどのUIの状態は個別のコンポーネントがローカルに持った方が良い
  * 何でもかんでもstoreに入れると管理が難しくなる
* フォームの状態をReduxに入れない
  * フォームのデータは個別のコンポーネントに閉じ込められるべき
  * フォームは`React Hook Form`がおすすめ
* 複雑なロジックはコンポーネントの外に追い出す
* 非同期処理には`Redux Thunk`を使う

**以上のルールを押さえておけば基本的にはOK**
**また、`Redux Toolkit`を使えばこれらのルールの半分程度は自然と守られる**







