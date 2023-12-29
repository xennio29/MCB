export class TixProfil {
     public name: string;
     public tixPoints: string;

     private readonly UNWANTED_CHARACTER : string[] = ["\""];

     constructor(name: string, tixPoint: string) {
        this.name = name;
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