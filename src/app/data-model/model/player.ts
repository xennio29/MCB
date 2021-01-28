export class Player {
     public firstName: string;
     public lastName: string;
     public pseudo: string;

     constructor(firstName: string, lastName: string, pseudo: string) {

        this.missConstruct(firstName, lastName, pseudo);

        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;

    }

    missConstruct(firstName: string, lastName: string, pseudo: string) {

        const issue: string[] = []

        if (firstName === null || firstName === undefined) { issue.push['firstName']; }
        if (lastName === null || lastName === undefined) { issue.push['lastName']; }
        if (pseudo === null || pseudo === undefined) { issue.push['pseudo']; }

        if (issue.length !== 0) {
            console.error('[DATA ERROR FOR PLAYER]: on parameter : ', issue.concat(', '));
        }

    }

}