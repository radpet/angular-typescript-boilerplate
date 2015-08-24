import {Component, View} from 'angular2/angular2';
import {Jobs} from 'components/jobs';
//import template from './app.html!text';
@Component({
    selector: 'my-app'
})
@View({
    template: '<jobs></jobs>',
    directives: [Jobs]
})

export class App {
    constructor(){

    }
}
