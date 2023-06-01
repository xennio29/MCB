export class MasterProfil {
     public name: string;
     public masterPoints: string;

     private readonly UNWANTED_CHARACTER : string[] = ["\""];

     constructor(name: string, masterPoint: string) {
        this.name = this.cleanname(name);
        this.masterPoints = masterPoint;
    }

    private cleanname(name: string): string {
        return this.cleanupString(name);
    }

    private cleanupString(s :string): string {
        this.UNWANTED_CHARACTER.forEach(char => {
            s = s.replace(char, "");
        });
        return s;
    }
}