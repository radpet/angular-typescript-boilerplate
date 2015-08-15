import {Dev} from 'models/people/dev.ts';

let expect = chai.expect;

describe('Tests for the dev',function(){
   it('Test if .info() gives correct info',function(){
      let dev : Dev = new Dev('Jack');

     expect(dev.getName()).to.equal('Jack');

   });
});