import { GAME_ANSWER } from 'redux/actionTypes';
import { EvenOdd } from "database";

export interface IMakeAnswer {
    type: typeof GAME_ANSWER
    evenodd: EvenOdd
    number: number
}
