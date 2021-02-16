// TODOアプリの例 - 必要なsliceは以下

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

type Task = {
  id: string;
  title: string;
  deadline?: Date;
  createdAt?: Date;
};

export type TodoState = {
  todoList: { [id: string]: Task } ;
  doneList: { [id: string]: Task } ;
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: { todoList: {}, doneList: {} } as TodoState,
  reducers: {
    taskCreated: (
      state,
      action: PayloadAction<Pick<Task, 'title' | 'deadline'>>,
    ) => {
      const id = uuid();
      const createdAt = new Date();
      state.todoList[id] = { ...action.payload, id, createdAt };
    },
    taskDone: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.todoList[id];
      if (task) {
        state.doneList[id] = { ...task };
        delete state.todoList[id];
      }
    },
    taskUpdated: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
      const { id, ...data } = action.payload;
      const task = state.todoList[id];
      if (task) state.todoList[id] = { ...task, ...data };
    },
  },
});

// ・(prevState, action) => newState になっていない
// ・stateを直接書き換えている
// しかし、機能はする
// なぜなら、createReducerやcreateSliceではreducerがvoidの場合、
// 自動的にImmerを適用しイミュータブルなstate更新を行ってくれる
// これもtoolkitを使うメリット
// Reduxを使っておきながらtoolkitを使わないのは損でしかない
