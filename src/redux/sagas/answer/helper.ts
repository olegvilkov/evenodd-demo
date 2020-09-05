import { IUser } from "redux/reducers/user/types";
import { IGame } from "redux/reducers/currentgame/types";
import { IPlayerList } from "redux/reducers/playerlist/types";

/**
 * Определяет лидирует ли игрок
 */
export function isUserGameLeader (user: IUser, game: IGame, players: IPlayerList, isAnswerCorrect: boolean) {
    if (game.playersForStart != players.length) {
      return;
    }
  
    const order = players.map(player =>
        player.id == user.uid ?
          {...player, points: isAnswerCorrect ? player.points + 1 : player.points}
          :
          player
    );
  
    order.sort((a, b)=>{
      return b.points - a.points;
    });
  
    if (order[0].points == order[1].points) {
      return;
    }
  
    return order[0].id == user.uid;
}

/**
 * Определяет закончилась ли игра
 */
export function isGameEnd(game: IGame) {
  return (game.turns-1 <= 0);
}