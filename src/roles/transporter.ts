import {Role} from 'RoleTypes'

const transporter: Role = {
  run: (creep) => {

    // ресурсы на полу
    const droppedResources = creep.room
      .find(FIND_DROPPED_RESOURCES);

    // контейнеры
    const containers = creep.room
      .find(FIND_STRUCTURES)
      .filter((structure): structure is StructureContainer => structure.structureType === STRUCTURE_CONTAINER)
      .sort((structureA, structureB) => structureA.store.energy < structureB.store.energy ? -1 : 0);

    // хранилища єнергии
    const energyStorages = creep.room
      .find(FIND_STRUCTURES)
      .filter((structure) => ((structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER && structure.store.energy < 600) &&
                            structure.store.getFreeCapacity("energy") !== 0) || structure.structureType === STRUCTURE_STORAGE
      )
      .sort(target => target.structureType === STRUCTURE_EXTENSION ? 1 : -1)
      .sort(target => target.structureType === STRUCTURE_SPAWN ? 1 : -1)
      .sort(target => target.structureType === STRUCTURE_TOWER ? 1 : -1)
      .sort(target => target.structureType === STRUCTURE_STORAGE ? 1 : -1);

    if (creep.store.getUsedCapacity() === 0) creep.memory.transferring = false;

    if (creep.store.energy < creep.store.getCapacity() && !creep.memory.transferring) {
      // если есть ресурсы на полу - пойти и собрать
      if (droppedResources.length) {
        const pickupReturnCode = creep.pickup(droppedResources[0]);
        if (pickupReturnCode === ERR_NOT_IN_RANGE) creep.moveTo(droppedResources[0]);
        if (pickupReturnCode === ERR_FULL) creep.moveTo(droppedResources[0]);
        return
      }

      // если есть контейнеры в которых есть ресурсы - пойти и собрать
      if (containers.length) {
        const amountOfResourcesToWithdraw = containers[0].store.energy < creep.store.getFreeCapacity() ? containers[0].store.energy : creep.store.getFreeCapacity();
        const withdrawReturnCode = creep.withdraw(containers[0], "energy", amountOfResourcesToWithdraw);
        if (withdrawReturnCode === ERR_NOT_IN_RANGE) creep.moveTo(containers[0]);
        if (withdrawReturnCode === OK) creep.memory.harvesting = true;
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
