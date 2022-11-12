import { Match } from "../model/match";
import { Database } from "./database";

/**
 * This class is containing all needed data.
 */
export class PlayerDatabase implements Database {

    private _tournamentName: string;
    private _roundNumber: string;
    private _matchs: Match[];

    constructor(data: any) {
        
        this._tournamentName = data.tournamentName;
        console.log('[System] Welcome to ' + this._tournamentName);

        this._roundNumber = data.roundNumber;
        console.log('[System] We are in round ' + this._roundNumber);

        this._matchs = this.constructMatchs(data.matchs);
        console.log('[System] ' + this._matchs.length + ' matchs imported.');
    };

    getTournamentName(): string {
        return this._tournamentName;
    }

    getRoundNumber(): string {
        return this._roundNumber;
    }

    getAllMatchs(): Match[] {
        return this._matchs;
    }

    private constructMatchs(matchsData): Match[] {
        const matchs: Match[] = [];
        matchsData.forEach(matchData => {
            const match: Match = this.constructMatch(matchData);
            matchs.push(match)
        });
        return matchs;
    }

    private constructMatch(matchData): Match {
        return new Match(
            matchData.table,
            matchData.player1,
            matchData.player2
        );
    }
}