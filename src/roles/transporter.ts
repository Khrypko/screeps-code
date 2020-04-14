import {Role} from 'RoleTypes'

const transporter: Role = {
  run: (creep) => {

    // контейнеры
    const containers = creep.room
      .find(FIND_STRUCTURES)
      .filter((structure): structure is StructureContainer => structure.structureType === STRUCTURE_CONTAINER)
      .sort((structureA, structureB) => structureA.store.energy < structureB.store.energy ? -1 : 0);

    // хранилища єнергии
    const energyStorages = creep.room
      .find(FIND_STRUCTURES)
      .filter((structure) => (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity("energy") !== 0
      )
      .sort(target => target.structureType === STRUCTURE_TOWER ? 1 : -1);


    if (creep.store.getUsedCapacity() === 0) creep.memory.transferring = false;

    if (creep.store.energy < creep.store.getCapacity() && !creep.memory.transferring) {
      // если есть контейнеры в которых есть ресурсы - пойти и собрать
      if (containers.length) {
        const amountOfResourcesToWithdraw = containers[0].store.energy < creep.store.getFreeCapacity() ? containers[0].store.energy : creep.store.getFreeCapacity();
        console.log("amountOfResourcesToWithdraw: ", amountOfResourcesToWithdraw);
        const withdrawReturnCode = creep.withdraw(containers[0], "energy", 100);
        if (withdrawReturnCode === ERR_NOT_IN_RANGE) creep.moveTo(containers[0]);
        if (withdrawReturnCode === OK) creep.memory.harvesting = true
        console.log(withdrawReturnCode);
      }

    } else {

      if (creep.memory.harvesting) creep.memory.harvesting = false;
      if (energyStorages.length > 0 && creep.store.getUsedCapacity() && !creep.memory.harvesting) {
        creep.memory.transferring = true;
        const transferReturnCode = creep.transfer(energyStorages[0], RESOURCE_ENERGY);
        if (transferReturnCode === ERR_NOT_IN_RANGE) creep.moveTo(energyStorages[0]);
        if (transferReturnCode === ERR_FULL) creep.moveTo(energyStorages[0]);
      }
    }
  }
};

export default transporter
