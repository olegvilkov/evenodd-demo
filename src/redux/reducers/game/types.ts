
export interface IGame {
    id?: string
    name: string
    playersCount: number
    playersForStart: number
    roundsForWin: number
    winner?: string
}