export class MasterProfilLine {
    public name: string;
    public date: string;
    public eventType: string;
    public masterPoints: string;

    private readonly UNWANTED_CHARACTER : string[] = ["\""];

    constructor(name: string, date: string, eventType: string, masterPoints: string) {
        this.name = name;
        this.date = date;
        this.eventType = eventType;
        this.masterPoints = masterPoints;
    }

    private cleanupString(s :string): string {
        this.UNWANTED_CHARACTER.forEach(char => {
            s = s.replace(char, "");
        });
        return s;
    }
}

export class MasterProfil {
    public name: string;
    public masterChanges: MasterChangeByEvent[];

    constructor(name: string, masterChanges: MasterChangeByEvent[]) {
        this.name = name;
        this.masterChanges = masterChanges;
    }

    public getTotalMasterPoints():number {
        let totalMasterPoints = 0;
        this.masterChanges.forEach(masterChange => totalMasterPoints = totalMasterPoints + masterChange.masterPoints);
        return Math.round(totalMasterPoints);
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

export function fromMasterLinesToMasterProfils(masterProfilLines: MasterProfilLine[]): MasterProfil[] {
    let masterProfils: Map<string,MasterProfil> = new Map();
    masterProfilLines.forEach(masterProfilLine => {
        let name = masterProfilLine.name;
        if (masterProfils.has(name)) {
            let newMasterProfil = masterProfils.get(name);
            let masterChange: MasterChangeByEvent = createMasterChangeByEventFromMasterProfilLine(masterProfilLine);
            newMasterProfil.masterChanges.push(masterChange);
            masterProfils.set(name, newMasterProfil);
        } else {
            let masterChange: MasterChangeByEvent = createMasterChangeByEventFromMasterProfilLine(masterProfilLine);
            let newTixProfil = new MasterProfil(name, [masterChange]);
            masterProfils.set(name, newTixProfil);
        }
    });
    return Array.from(masterProfils.values());
}

function createMasterChangeByEventFromMasterProfilLine(masterProfilLine: MasterProfilLine): MasterChangeByEvent {
    let masterPoints: number = +masterProfilLine.masterPoints;
    return new MasterChangeByEvent(
        new Date(masterProfilLine.date),
        masterProfilLine.eventType,
        masterPoints
    );
}