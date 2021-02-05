// useCallback : 実行結果ではなく関数定義そのものをメモ化する
// useMemo: 再計算を防ぎ、プログラムを高速化するためにメモ化する

export const getPrimes = (maxRange: number): number[] => {
  // 素数の配列を生成 getPrimes(10) -> [2, 3, 5, 7]
  [...Array(maxRange + 1).keys()].slice(2).filter((n) => {
    for(let i = 2; i < n; i += 1) {
      if (n % i == 0) return false;
    }
    return true;
  })
}

import React, { FC, useEffect, useMemo, useState, useCallBack } from 'react';
 
type TimerProps = {
  limit: number;
};

const Timer: FC<TimerProps> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);
  // const reset = () => setTimeLeft(limit);
  const reset = useCallBack(() => setTimeLeft(limit),[limit])
  // limitが変わった時だけ、reset()が再定義される
  const tick = () => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  },[])

  useEffect(() => {
    if (timeLeft === 0) setTimeLeft(limit);
  },[timeLeft, limit])

  return (
    <>
      <div>
        <p>time</p>
        <p className={primes.includes(timeLeft) ? 'prime-number' : undefined}>
          {timeLeft}
        </p>
      </div>
      <button onclick={reset}>
        Reset
      </button>
    </>
  )
}

export default Timer;