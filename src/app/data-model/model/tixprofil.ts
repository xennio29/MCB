export class TixProfil {
     public firstName: string;
     public lastName: string;
     public tixPoints: string;

     private readonly UNWANTED_CHARACTER : string[] = ["\""];

     constructor(firstName: string, lastName: string, tixPoint: string) {
        this.firstName = this.cleanFirstName(firstName);
        this.lastName = this.cleanLastName(lastName);
        this.tixPoints = tixPoint;
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