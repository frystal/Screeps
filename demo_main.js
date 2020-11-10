var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCommon = require("role.common");
var roleSimpleHarvester = require("role.simpleharvest");
var roleCarrier = require("role.carrier");
require("role.config");
require("config");
var state = require("state");

module.exports.loop = function () {

    for(var i=0;i<totalCommon;i++){
        var name = "B"+i;
        if(!Game.creeps[name]){  
            delete Memory.creeps[name];
            Game.spawns['base'].spawnCreep(builderConfig, name, {memory: {role: 'builder'}});
            console.log("generate "+name);
        }
    }
    for(var name in needRole){
        if(!Game.creeps[name]){  
            delete Memory.creeps[name];
            Game.spawns['base'].spawnCreep(creepConfig[(needRole[name]).slice(0,1)], name, {memory: {role: 'builder'}});
            console.log("generate "+name);
        }
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 1) {
        var newName = 'U1';
        if(Game.spawns['base'].spawnCreep(creepConfig, newName, {memory: {role: 'upgrader'}})==0)
        {
            console.log("upgrader generate!");
        }
    }
    if(!Game.creeps["SH1"]){
        delete Memory.creeps["SH1"];
        Game.spawns['base'].spawnCreep(harvestConfig, "SH1", {memory: {role: 'simpleHarverst'}});
    }
    if(!Game.creeps["C1"]){
        delete Memory.creeps["C1"];
        Game.spawns['base'].spawnCreep(carrierConfig, "C1", {memory: {role: 'carrier'}});
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'simpleHarverst') {
            roleSimpleHarvester.run(creep,source1,pos1);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == "common"){
            if(creep.room.energyAvailable === creep.room.energyCapacityAvailable){
                roleCommon.build(creep);
            }
            else{
                roleCommon.harvest(creep);
            }
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
    state.stateScanner();
}


