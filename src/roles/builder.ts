import {Role} from 'RoleTypes'

const builder: Role = {
  run: (creep) => {
    if (creep.memory.building && creep.carry.energy === 0)
    {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }

    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity)
    {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building)
    {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length) {
        if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    } else {
      const allCreepsIsBuilt = Object.keys(Memory.creeps).length === 9; // TODO: hardcoded
      if (allCreepsIsBuilt) {
        const spawns = creep.room.find(FIND_MY_SPAWNS);
        if(creep.withdraw(spawns[0], "energy") === ERR_NOT_IN_RANGE) {
          creep.moveTo(spawns[0]);
        }
      } else {
        creep.say('waiting');
      }
    }
  }
};

export default builder;
