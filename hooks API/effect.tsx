// useEffect

import { FC, useState, useEffect } from 'react'

const Timer: FC<{limit: number}> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const reset = () => setTimeLeft(timeLeft);
  const tick = () => setTimeLeft((t: number) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
    // 戻り値として設定された関数はアンマウント時に実行される
  },[]);

  useEffect(() => {
    if(timeLeft === 0) setTimeLeft(limit);
  },[timeLeft, limit]);

  return (
    <>
    <div>
      <span>time</span>
      <span>{timeLeft}</span>
    </div>
    <div>
      <input type="button" value="Reset" onclick={reset}/>
    </div>
    </>
  )
}