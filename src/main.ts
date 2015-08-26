import 'zone.js';
import 'reflect-metadata';
import 'es6-shim';
import {bootstrap} from 'angular2/angular2';
import {App} from 'app/app';

import {Dev} from 'models/people/dev';

console.log(new Dev('J').getName());

bootstrap(App);
