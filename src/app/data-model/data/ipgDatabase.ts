import { Infraction } from "../model/infraction";
import { Match } from "../model/match";
import { Database } from "./database";

/**
 * This class is containing all needed data.
 */
export class IpgDatabase implements Database {

    private _infractions: Infraction[];

    constructor(data: any) {

        this._infractions = this.constructInfractions(data.infractionList);
        console.log('[System] ' + this._infractions.length + ' infraction imported.');
    };

    getInfractions(): Infraction[] {
        return this._infractions;
    }

    private constructInfractions(infractionList): Infraction[] {
        const infractions: Infraction[] = [];
        infractionList.forEach(infractionData => {
            const infraction: Infraction = this.constructInfraction(infractionData);
            infractions.push(infraction)
        });
        return infractions;
    }

    private constructInfraction(infractionData): Infraction {
        return new Infraction(
            infractionData.name,
            infractionData.penalty
        );
    }
}