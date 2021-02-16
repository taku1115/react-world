import { createReducer, payloadAction } from '@reduxjs/toolkit';
import { added, decremented, incremented } from './counter-action';

export type CounterState = {
  count: number;
};

const initialState: CounterState = { count: 0 };

export const counterReducer = createReducer(initialState, {
  [added.type]: (state, action: payloadAction<number>) => ({
    ...state,
    count: action.payload,
  }),
  [decremented.type]: (state) => ({ ...state, count: state.count - 1 }),
  [incremented.type]: (state) => ({ ...state, count: state.count + 1 }),
});

// switch-case文が消えてスッキリする

// 注意点：reducer関数の第二引数actionにPayloadActionインターフェースを使った型定義がないと
// actionがanyで定義されてしまう

// 第一引数の型定義が省略できているのはinitialStateから型推論されているため


