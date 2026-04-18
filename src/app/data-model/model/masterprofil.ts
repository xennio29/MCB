export class MasterProfil {
    public firstName: string;
    public lastName: string;
    public masterChanges: MasterChangeByEvent[];

    constructor(firstName: string, lastName: string, masterChanges: MasterChangeByEvent[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.masterChanges = masterChanges;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public getTotalMasterPoints(): number {
        let totalMasterPoints = 0;
        this.masterChanges.forEach(masterChange => totalMasterPoints = totalMasterPoints + masterChange.masterPoints);
        totalMasterPoints = totalMasterPoints * 10;
        totalMasterPoints = Math.round(totalMasterPoints);
        return totalMasterPoints / 10;
    }
}

export class MasterChangeByEvent {
    public date: Date;
    public eventType: string;
    public masterPoints: number;

    constructor(date: Date, eventType: string, masterPoints: number) {
        this.date = date;
        this.eventType = eventType;
        this.masterPoints = masterPoints;
    }
}