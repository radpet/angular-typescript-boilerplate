import {Job} from 'models/people/job';
export class Dev extends Job{

    constructor(name:string) {
        super(name)
    }
    info(){
        return super.getName();
    }
}