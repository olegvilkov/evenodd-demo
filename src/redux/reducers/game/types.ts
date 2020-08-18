
export interface IGame {
    name: string
    id: string
    playersCount: number
    playersForStart: number
    minRoundsForWin: number
    winner?: string
}