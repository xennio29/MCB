import { Player } from "./player";

export class Team {
     public topLaner: Player;
     public midLaner: Player;
     public jungle: Player;
     public botlaner: Player;
     public support: Player;
     public name: string;
     public id: number;

     constructor(topLaner: Player, midLaner: Player, jungle: Player, botlaner: Player, support: Player, name: string, id: number) {

        this.missConstruct(topLaner, midLaner, jungle, botlaner, support, name, id);

        this.id = id;
        this.topLaner = topLaner;
        this.midLaner = midLaner;
        this.jungle = jungle;
        this.botlaner = botlaner;
        this.support = support;
        this.name = name;

    }

    missConstruct(topLaner: Player, midLaner: Player, jungle: Player, botlaner: Player, support: Player, name: string, id: number) {

        const issue: string[] = []

        if (topLaner === null || topLaner === undefined) { issue.push['firstName']; }
        if (midLaner === null || midLaner === undefined) { issue.push['lastName']; }
        if (jungle === null || jungle === undefined) { issue.push['pseudo']; }
        if (botlaner === null || botlaner === undefined) { issue.push['pseudo']; }
        if (support === null || support === undefined) { issue.push['pseudo']; }
        if (name === null || name === undefined) { issue.push['pseudo']; }
        if (id === null || id === undefined) { issue.push['id']; }

        if (issue.length !== 0) {
            console.error('[DATA ERROR FOR TEAM]: on parameter : ', issue.concat(', '));
        }

    }

}