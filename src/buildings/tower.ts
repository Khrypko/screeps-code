export default {

  tick: () => {

    /*

    ORIGINAL TOWER CODE

    //TOWER CODE
    var towers = Game.rooms.W61S27.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    */
    const myRoomName = "W46S22";
    const hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
    const towers: Array<FindTypes[108]> = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});


    if (hostiles.length > 0) {
      (towers as StructureTower[]).forEach(tower => tower.attack(hostiles[0]));
      console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!");
    }


    if (hostiles.length === 0) {
      for (const name in Game.creeps) {
        // get the creep object
        const creep = Game.creeps[name];
        if (creep.hits < creep.hitsMax) {
          (towers as StructureTower[]).forEach(tower => tower.heal(creep));
          console.log("Tower is healing Creeps.");
        }
      }

      for (const tower of (towers as StructureTower[])){
        if(tower.energy > (tower.energyCapacity * 0.8)){
          const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART});
          if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            console.log("The tower is repairing buildings.");
          }
        }
      }

    }
  }
};
