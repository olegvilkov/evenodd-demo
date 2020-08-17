
export interface IGameItem {
    title: string,
    id: string,
    playersCount: number,
    maxPlayers: number,
}

export type IGameList = Array<IGameItem>

export interface IAddGameToList {
    type: string
    payload: IGameItem
}

export type ActionTypes = IAddGameToList;