// Custom Hook : ロジックを分離・再利用する

// ごちゃごちゃしたコードを整理する
// CustomHook関数名は頭に use をつけるのがルール

//ロジックをuseTimerに分離しておくと、Timerコンポーネントが以下のようにシンプルになる
import React, { FC } from 'react';
import useTimer from './useTimer';

const Timer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, isPrime, reset] = useTimer(limit);

  return (
    <>
    <div>
      <p>time</p>
      <p className={isPrime ? 'prime-number' : undefined}>
        {timeLeft}
      </p>
    </div>
    <button onclick={reset}>
      Reset
    </button>
  </>
  )
}

// 応用：Timerコンポーネントを presentational / container で分離する

type Props = {
  timeLeft?: number;
  isPrime?: boolean;
  reset?: () => void;
};
// limitはロジックでしか使われない変数であるためpropsに入れなくて良い

// 見た目だけで完結するコンポーネント（このままスタイルガイド掲載も可能）
const TimerPresentational: FC<Props> = ({
  timeLeft = 0,
  isPrime = false,
  reset = () => undefined,
}) => (
  <>
    <div>
      <p>time</p>
      <p className={isPrime ? 'prime-number' : undefined}>
        {timeLeft}
      </p>
    </div>
    <button onclick={reset}>
      Reset
    </button>
  </>
);

const TimerContainer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, isPrime, reset] = useTimer(limit);
  return <TimerPresentational timeLeft={timeLeft} isPrime={isPrime} reset={reset} />
}

// ファイルの数は増えるが、独立性・可読性・再利用性・テストのしやすさが高まる
// 現代のプロダクトは「チーム開発＆末長くメンテナンス」のためこういったコンポーネントデザインが重要