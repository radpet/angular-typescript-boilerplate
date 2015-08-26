import {Component, View,NgFor} from 'angular2/angular2';
import * as $ from 'jquery';

@Component({
    selector: 'jobs'
})
@View({
    template: '<div *ng-for="#job of jobs">{{job}}</div>',
    directives: [NgFor]
})

export class Jobs {
    name:any;
    jobs:string[];
    constructor() {
        this.name = 'Dev';
        this.jobs = [];

        this.jobs.push('dev');
        this.jobs.push('qa');
        this.jobs.push('ba');

        this.name = {
            name:'name'
        };
    }
}