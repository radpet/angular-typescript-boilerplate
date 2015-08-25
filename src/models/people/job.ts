
export class Job{
    name:string;
    height:number;

    constructor(name:string){
        this.name = name;
    }

    getName():string{
        return this.name;
    }
}