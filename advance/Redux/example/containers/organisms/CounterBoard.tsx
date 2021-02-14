import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { add, decrement, increment } from 'actions';
import { CounterState } from './reducer';
import CounterBoard from 'components/organisms/CounterBoard';

const EnhancedCounterBoard: FC = () => {

  const count = useSelector<CounterState, number>((state) => state.count);
  // useSelector: stateから任意のstateの値を抽出するためのAPI
  // 型引数: 第1引数->storeのstateツリー全体の型、第2引数: 抽出するstate値の型
  // storeのstateをまるごと取得するuseStoreというAPIもあるがあまり使われない

  const dispatch = useDispatch();
  // useDispatch: dispacherに渡すための関数を取得するAPI
  // actionを引数にしてコールすることでactionがdispatchされる
  // dispatch({ type: 'DECREMENT' }) -> DECREMENTタイプのactionがdispatch

  return (
    <CounterBoard
      count={count} 
      add={ (amount: number) => dispatch(add(amount))}
      decrement={() => dispatch(decrement())}
      increment={() => dispatch(increment())}
    />
  );
};

export default EnhancedCounterBoard;