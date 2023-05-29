export class Player {
     public firstName: string;
     public lastName: string;
     public tixPoint: number;

     constructor(firstName: string, lastName: string, tixPoint: number) {

        this.missConstruct(firstName, lastName, tixPoint);

        this.firstName = firstName;
        this.lastName = lastName;
        this.tixPoint = tixPoint;
    }

    private missConstruct(firstName: string, lastName: string, tixPoint: number) {

        const issue: string[] = []

        if (firstName === null || firstName === undefined) { issue.push['firstName']; }
        if (lastName === null || lastName === undefined) { issue.push['lastName']; }
        if (tixPoint === null || tixPoint === undefined) { issue.push['pseudo']; }

        if (issue.length !== 0) {
            console.error('[DATA ERROR FOR PLAYER]: on parameter : ', issue.concat(', '));
        }
    }
}