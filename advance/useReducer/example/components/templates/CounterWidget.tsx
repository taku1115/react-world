import React, { FC } from 'react';
import ColorfulBeads from 'components/molecules/ColorfulBeads';
import CounterBoard, { CounterBoardProps } from 'components/organisms/CounterBoard';

const CounterWidget: FC<Required<CounterBoardProps>> = ({
  count = 0,
  add = () => undefined,
  decrement = () => undefined,
  increment = () => undefined,
}) => (
  <>
    <CounterBoard {...{ count, add, decrement, increment }} />
    <ColorfulBeads count={count} />
  </>
);

export default CounterWidget;

// <CounterBoard>の属性値指定は、count={count} add={add}... と書くと冗長すぎるため
// スプレッド構文でまとめる
