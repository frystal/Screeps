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

    
    for(var name in needRole){
        
        if(!Game.creeps[needRole[name]]){  
            delete Memory.creeps[needRole[name]];
            if((!Game.creeps['SH1'])&&(needRole[name]!="SH1")){
                break;
            }
            Game.spawns['base'].spawnCreep(creepConfig[(needRole[name]).slice(0,1)], needRole[name], {memory: {role: creepRole[(needRole[name]).slice(0,1)]}});
            console.log("generate "+needRole[name]);
        }
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
        if(creep.memory.role == 'harvest') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == "common"){
            if(creep.room.energyAvailable === creep.room.energyCapacityAvailable){
                roleCommon.build(creep);
            }
            else{
                roleCommon.carry(creep);
            }
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
    state.stateScanner();
}


