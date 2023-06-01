export class MasterProfil {
     public firstName: string;
     public lastName: string;
     public masterPoints: string;

     private readonly UNWANTED_CHARACTER : string[] = ["\""];

     constructor(firstName: string, lastName: string, masterPoint: string) {
        this.firstName = this.cleanFirstName(firstName);
        this.lastName = this.cleanLastName(lastName);
        this.masterPoints = masterPoint;
    }

    private cleanFirstName(firstName: string): string {
        return this.cleanupString(firstName);
    }

    private cleanLastName(lastName: string): string {
        var cleanString = this.cleanupString(lastName);
        return cleanString.toUpperCase();
    }

    private cleanupString(s :string): string {
        this.UNWANTED_CHARACTER.forEach(char => {
            s = s.replace(char, "");
        });
        return s;
    }
}