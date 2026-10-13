import test from 'node:test';
import assert from 'node:assert/strict';
import {validDungeons,parseDuration,progressPoints,dungeonImage,recoverTimer} from '../src/run-utils.ts';
const d={id:1,name:'Tofu',runs:[{id:2,ms:300000,date:'13/10/2026',createdAt:1}]};
test('validate backup',()=>{assert.equal(validDungeons([d]),true);assert.equal(validDungeons([{...d,runs:[{...d.runs[0],ms:-2}]}]),false);assert.equal(validDungeons([{...d,runs:[{...d.runs[0],ms:'x'}]}]),false);assert.equal(validDungeons([d,d]),false)});
test('time parsing',()=>{assert.equal(parseDuration('05:06.42'),306420);assert.equal(parseDuration('05:99'),null)});
test('chart lower time higher',()=>{const s=progressPoints([{...d.runs[0],ms:400000},{...d.runs[0],ms:200000}]).split(' ');assert.ok(Number(s[1].split(',')[1])<Number(s[0].split(',')[1]))});
test('images',()=>{assert.match(dungeonImage('Bouftou'),/bouftou.png/);assert.match(dungeonImage('Crocabulia'),/dragon.png/)});
test('timer recovery',()=>{assert.equal(recoverTimer(JSON.stringify({dungeonId:1,phase:'running',elapsed:1500,startedAt:10000}),12500)?.elapsed,4000);assert.equal(recoverTimer('bad'),null)});
