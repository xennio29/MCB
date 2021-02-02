import { Team } from "./team";

export class Match {
    public team1: Team;
    public labelTeam1: string;
    public team2: Team;
    public labelTeam2: string;
    public winner: Team;
    public looser: Team
    public waitingWinner: boolean

    constructor(
        team1: Team,
        labelTeam1: string,
        team2: Team,
        labelTeam2: string,
        winner?: Team
    ) {

        this.team1 = team1;
        this.labelTeam1 = labelTeam1;
        this.team2 = team2;
        this.labelTeam2 = labelTeam2;
        
        if(winner === undefined) {
            this.waitingWinner = true;
        } else if (winner === team1) {
            this.winner = team1;
            this.looser = team2;
            this.waitingWinner = false;
        } else if (winner === team2) {
            this.winner = team2;
            this.looser = team1;
            this.waitingWinner = false;
        } else {
            console.error("Error for winner of match", team1, team2);
        }
        
    }

}
