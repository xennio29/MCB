export class TixProfil {
    public firstName: string;
    public lastName: string;
    public tixChanges: TixChangeByEvent[];

    constructor(firstName: string, lastName: string, tixChanges: TixChangeByEvent[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tixChanges = tixChanges;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public getTotalTix(): number {
        let totalTix = 0;
        this.tixChanges.forEach(tixChange => totalTix = totalTix + tixChange.tixDiff);
        return totalTix;
    }
}

export class TixChangeByEvent {
    public date: Date;
    public eventName: string;
    public tixDiff: number;

    constructor(date: Date, eventName: string, tixDiff: number) {
        this.date = date;
        this.eventName = eventName;
        this.tixDiff = tixDiff;
    }
}