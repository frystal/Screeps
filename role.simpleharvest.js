var roleSimpleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,sourceId,pos) {
	   
        creep.moveTo(pos[0],pos[1], {visualizePathStyle: {stroke: '#ffaa00'}});
        creep.harvest(Game.getObjectById(sourceId));
    }
};

module.exports = roleSimpleHarvester;