# Redux不要論

## オリジナル作者が離脱
* 作者のツイート
  * Does anyone actually *like* React these days?（今のReduxが好きな人なんか本当にいるの？）
  * Nobody likes Redux（Reduxなんて誰も好きじゃない）

## New Context APIの登場
* React単体でグローバルにデータを共有できるようになった
* 従来のContext機能からコンポーネントへの依存を取り除いた
* 使い勝手はあまりよくない
* Hooksで使えるようになってから受け入れられ始めた

## ContextはReduxを置き換えることができたか
* 限定的なケース（更新頻度が少ないもの）ではそう言える
  * i18n(国際化のこと)
  * UIテーマの設定
  * ユーザー認証管理
* Reduxの勢いはほぼ削がれていない

## マイクロサービスアーキテクチャがトレンドになる
* 一つのアプリケーションを認証や購入など、ドメインごとのサービスに分割して、システム的に独立して動くような形にしつつ開発や運用も別々のラインで行うもの
* 大規模なサーバサイド開発で浸透してきたものだが、マイクロフロントエンドの概念の提唱をきっかけに、フロントエンドにも届いてきている
* 高度なSPAを、モノシリックなアーキテクチャで開発するのは無理がある
* ドメインに分割したコンポーネント開発が一般化してくると、これまでの中央集権的な状態管理手法は成立し得なくなる。
* つまり、Reduxの思想と、時代の流れにズレが生じてきている

## SPAにおけるサーバサイドの在り方の変化がゲームのルールを変える
* 従来のAPIはサーバサイドWebアプリケーションの延長で、ただHTMLの代わりにJSONを出力するだけのようなものだった
* RESTの思想はサーバサイド視点のものであり、サーバサイドの都合にフロントエンドが合わせるのが当然と長い間思われていた
* しかし、アプリケーションの価値がUXに移るにつれて、力関係が逆転してきた
* 「BFF(Backends for Frontends)」という概念も登場し、フロントの都合にサーバ側が合わせるための技術が次々に登場
  * GraphQl
  * Firebase, AWA AmpifyなどのBaaS
* サーバサイドがフロントの都合を考慮せずにAPIを設計＆提供していたときは、フロントエンドは硬直的なデータを必要に応じて加工していた
* そういった状況ではReduxはとても便利
* しかし、フロントが直接サーバサイドにクエリを発行して柔軟にデータを取得できるようになれば、極端な話フロントエンドが独自に持つデータはなくなる
* RESTful APIのシーンでは無敵だったReduxも、GraphQLがBaaSが主力になる次のトレンドではいらなくなる可能性が高い

## Reduxと正面から競合するFacebook製ライブラリ 「Recoil」
* useStateの中身の状態をグローバルに扱えるようにしたもの
```ts
import React, { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

const counterState = atom({
  key: 'counter',
  defalut: 0,
});
// atom: Recoilにおけるstateの単位
// stateを特定するための'key'とデフォルト値の'defalut'を定義

const CounterBoard: FC = () => {
  const [count, setCount] = useRecoilState(counterState);
  // useRecoilState: どのコンポーネントでもatomに対応するstateとsetter関数が取得できる
  // 上位階層にて、<RecoilRoot>でこのコンポーネントをラップする必要あり

  const increment = () => setCount(c => c + 1);

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}> +1 </button>
    </>
  )
}
export default CounterBoard;
```
* Reduxはstoreでstateを一元管理するため、任意のstateを参照する際は常にツリー構造を意識
* 対してRecoilはatomのkeyでstateを特定する、分散管理時代に適している状態管理ライブラリである
* さらに、今度Reactで導入予定のコンポーネントのレンダリングを並列的に行えるように
するためのConcurrentモードについても、Reduxはその対応があやぶまれているが、Recoilはすでに対応済み

## この先Reduxとどう付き合っていくか
* 時代にふさわしい状態管理の在り方は、APIに対するクエリ単位のキャッシュ
* しかし、従来のRESTful APIを使う場合は、Reduxの代替としてRecoilはアリ
* すでにReduxがデファクトスタンダードの長い時代は終わった
### Reduxと無縁でいることは不可能
  * 既存のReactアプリケーションはほとんどがReduxとセットになっている
  * また、既存のプロジェクトのリファクタリングにRedux Toolkitを導入するケースもあり得る
### Reduxが必要なケース
  * GUI上でオブジェクトをインタラクティブに取り回せるようにしておきながら、裏でそれらのデ
ータの整合性をリアルタイムに取りつつ適宜ローカルのストレージやサーバに内容を保存する必要
があるもkの
  * 状態の変更履歴を保存しておいて undo / redo できるようにする必要があるもの
  * 具体的には、ゲームやエディタ、TrelloのようにGUIでぐりぐり動かすアプリなど
  * React Nativeによるモバイルアプリ
  * ElectronとReactを組み合わせたデスクトップアプリ
  * よくあるECサイトやSNS程度ならReduxを使う必要はない