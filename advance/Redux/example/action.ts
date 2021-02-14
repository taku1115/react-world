// actionは、『どんなイベントが起こったのかを表現するプレーンなオブジェクト』
// インクリメント / デクリメント / 任意の数を加算 の3種類のイベントを用意

// イベントの種類の定義
export const CounterActionType = {
  ADD: 'ADD',
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
} as const;

// 既存のオブジェクトから値の型を抽出して共用体型にするための自前のユーティリティ型
type ValueOf<T> = T[keyof T];

export type CounterAction = {
  type: ValueOf<typeof CounterActionType>;
  // (property) type: "ADD" | "DECREMENT" | "INCREMENT"
  amount?: number;
};

// actionを生成するActionCreater
// dispatcherにactionを発行するときは
// 直に { type: 'ADD', amount: 10 } のような生の値を渡すのではなく
// ActionCreater関数の戻り値を使う

export const add = (amount: number): CounterAction => ({
  type: CounterActionType.ADD,
  amount,
});

export const decrement = (): CounterAction => ({
  type: CounterActionType.DECREMENT,
});

export const increment = (): CounterAction => ({
  type: CounterActionType.INCREMENT,
});