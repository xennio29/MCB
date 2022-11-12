export class Match {

    public tableNumber: number;
    public player1Name: string;
    public player2Name: string;

    constructor(tableNumber: number, player1Name: string, player2Name: string) {
        this.tableNumber = tableNumber;
        this.player1Name = player1Name;
        this.player2Name = player2Name;
    }
}