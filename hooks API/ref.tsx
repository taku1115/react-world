// useRaf : リアルDOMへの参照に用いるrefオブジェクトを生成するためのもの

import React, { FC, SynthenticEvent, useState, useEffect, useCallBack, useRef } from 'react';

const TextInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>();
  // refオブジェクトを生成

  const handleClick = (e: SynthenticEvent): void => {
    e.preventDefault();
    if(inputRef.current) alert(inputRef.current.value);
    // 入力値をアラート表示
  };

  useEffect(() => {
    if(inputRef.current) inputRef.current.focus();
    // 初回レンダリングでinputフォームにフォーカス
  },[]);

  return (
    <>
      <input ref={inputRef} type='text' />
      {/* <input>のリアルDOMのノードがinputRef.currentで参照可能になる */}
      <button onclick={handleClick} type='button'>
        Click
      </button>
    </>
  );
};

export default TextInput;

// 以上が本来の使い方

// useRefは、refオブジェクトのみならず、あらゆる書き換え可能な値を保持できる
// 値の保持は基本的にはstateを使うが、stateは変更されると再レンダリングを起こす
// 再レンダリングを伴わずにデータを関数コンポーネントで保持しておきたいケースもある

// 例：callback.tsxのカウントダウンタイマー
// propsのlimit変更に伴い、新しいlimitでタイマーが初期化されるべき
// useEffectの依存配列にlimitを入れるとタイマーの挙動が狂う
// (開始後10.99sでlimitが50に変更されると、再開後0.01sで 50→49 となる)
// useRefを使ってtimerIdを保持しておき、limit変更時にIdのクリア処理を行えば良い

const Timer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const timerId = useRef<NodeJS.Timeout>();
  // 最新のtimerIdを保持
  // useStateと異なり、値の変更が再レンダリングを発生させない
  const reset = useCallBack(() => setTimeLeft(limit), [limit]);
  const tick = ():void => setTimeLeft(preTime => preTime - 1);

  // limit変更時に、以前のtimerIDがあるならそれを使ってインターバルタスクをクリア
  // なければ新規のtimerIdをtimerID.currentに格納する
  useEffect(() => {
    const clearTimer = () => {
      if (timerId.current) clearInterval(timerId.current);
    }
    reset();
    clearTimer();
    timerId.curremt = setInterval(tick, 1000);
    return clearTimer;
  },[limit, reset]);

  useEffect(() => {
    if (timeLeft === 0) reset();
  },[timeLeft, reset]);

  return (
    // ---省略---
  )
}