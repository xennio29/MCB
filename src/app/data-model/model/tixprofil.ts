export class TixProfilLine {
     public name: string;
     public date: string;
     public eventName: string;
     public tixdiff: string;

     private readonly UNWANTED_CHARACTER : string[] = ["\""];

     constructor(name: string, date: string, eventName: string, tixdiff: string) {
        this.name = name;
        this.date = date;
        this.eventName = eventName;
        this.tixdiff = tixdiff;
    }

    private cleanupString(s :string): string {
        this.UNWANTED_CHARACTER.forEach(char => {
            s = s.replace(char, "");
        });
        return s;
    }
}

export class TixProfil {
    public name: string;
    public tixChanges: TixChangeByEvent[];

    constructor(name: string, tixChanges: TixChangeByEvent[]) {
        this.name = name;
        this.tixChanges = tixChanges;
    }

    public getTotalTix():number {
        let totalTix = 0;
        this.tixChanges.forEach(tixChange => totalTix = totalTix + tixChange.tixDiff);
        return totalTix;
    }
}

export class TixChangeByEvent {
    public date: string;
    public eventName: string;
    public tixDiff: number;

    constructor(date: string, eventName: string, tixDiff: number) {
        this.date = date;
        this.eventName = eventName;
        this.tixDiff = tixDiff;
    }
}

export function fromTixLinesToTixProfils(tixProfilLines: TixProfilLine[]): TixProfil[] {
    let tixProfils: Map<string,TixProfil> = new Map();
    tixProfilLines.forEach(tixProfilLine => {
        let name = tixProfilLine.name;
        if (tixProfils.has(name)) {
            let newTixProfil = tixProfils.get(name);
            let tixChange: TixChangeByEvent = createTixChangeByEventFromTixProfilLine(tixProfilLine);
            newTixProfil.tixChanges.push(tixChange);
            tixProfils.set(name, newTixProfil);
        } else {
            let tixChange: TixChangeByEvent = createTixChangeByEventFromTixProfilLine(tixProfilLine);
            let newTixProfil = new TixProfil(name, [tixChange]);
            tixProfils.set(name, newTixProfil);
        }
    });
    return Array.from(tixProfils.values());
}

function createTixChangeByEventFromTixProfilLine(tixProfilLine: TixProfilLine): TixChangeByEvent {
    let tixDiff: number = +tixProfilLine.tixdiff;
    return new TixChangeByEvent(
        tixProfilLine.date,
        tixProfilLine.eventName,
        tixDiff
    );
}