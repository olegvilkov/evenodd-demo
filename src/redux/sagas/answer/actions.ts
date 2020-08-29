import { GAME_ANSWER } from 'redux/actionTypes';
import { IMakeAnswer } from './types';
import { EvenOdd } from 'database';

export const makeAnswer = (evenodd: EvenOdd, number: number): IMakeAnswer => ({
  type: GAME_ANSWER,
  evenodd,
  number
})