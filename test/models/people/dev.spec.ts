import {Dev} from 'models/people/dev';
import * as $ from 'jquery';

let expect = chai.expect;
describe('Tests for the dev',function(){
   it('Test if .info() gives correct info',function(){
      let dev : Dev = new Dev('Jack1');
    expect(dev.info()).to.equal('Jack1');

   });
});