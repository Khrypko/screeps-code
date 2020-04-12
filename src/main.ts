import * as controllers from 'controllers';
import roles from 'roles';
import { ErrorMapper } from "utils/ErrorMapper";
import tower from "./buildings/tower";
import {RoleName} from './RoleTypes'
const { spawnController } = controllers;
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

const loop = ErrorMapper.wrapLoop(
  () => {
    spawnController.clearDead();
    spawnController.spawn(RoleName.HARVESTER, 5, [WORK, CARRY, CARRY, MOVE, MOVE]);
    spawnController.spawn(RoleName.OTHER_HARVESTER, 1, [WORK, WORK, WORK, CARRY, CARRY, MOVE], true);
    spawnController.spawn(RoleName.UPGRADER, 2, [WORK, WORK, WORK, WORK, CARRY, MOVE]);
    spawnController.spawn(RoleName.BUILDER, 1, [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]);
    tower.tick()
    for(const name in Game.creeps) {
      const creep = Game.creeps[name];
      const creepRole = creep.memory.role;
      roles[creepRole].run(creep)
    }
  }
);


export {
  loop
}
