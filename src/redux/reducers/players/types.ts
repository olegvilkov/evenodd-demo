
interface IPlayer {
    id: string
    order: number
    name: string
    points: number
}

export type IPlayerList = Array<IPlayer>

export interface IChangePlayer {
    type: string
    payload: IPlayer
}

export type ActionTypes = IChangePlayer;