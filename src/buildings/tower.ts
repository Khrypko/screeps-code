import {isSpotted} from "../utils/utilityFunctions";
import settings from "../settings";

const {myRoomName} = settings;

export default {
  tick: () => {
    const hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
    const towers: any = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});


    if (isSpotted(hostiles)) {
      (towers as StructureTower[]).forEach(tower => tower.attack(hostiles[0]));
      console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!");
    } else {
      for (const name in Game.creeps) {
        // get the creep object
        const creep = Game.creeps[name];
        if (creep.hits < creep.hitsMax) {
          (towers as StructureTower[]).forEach(tower => tower.heal(creep));
          console.log("Tower is healing Creeps.");
        }
      }

      for (const tower of (towers as StructureTower[])){
        if(tower.energy > (tower.energyCapacity * 0.5)){

          const structures = tower.room.find(FIND_STRUCTURES);
          const damagedDefences = structures
            .filter(s =>
              s.structureType === STRUCTURE_WALL ||
              s.structureType === STRUCTURE_RAMPART
            )
            .sort((first, second) => first.hits - second.hits);

          const damagedStructures = structures
            .filter(s =>
              s.structureType !== STRUCTURE_WALL &&
              s.structureType !== STRUCTURE_RAMPART &&
              s.hits !== s.hitsMax
            )
            .sort((first, second) => (second.hitsMax - second.hits) - (first.hitsMax - first.hits));

          if (isSpotted(damagedStructures)) tower.repair(damagedStructures[0]);
          if (damagedDefences[0] && !isSpotted(damagedStructures)) tower.repair(damagedDefences[0]);
          }
        }
      }

    }
};
