import * as controllers from 'controllers';
import roles from 'roles';
import { ErrorMapper } from "utils/ErrorMapper";
import {RoleName} from './RoleTypes'

const { spawnController } = controllers;
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

const loop = ErrorMapper.wrapLoop(
  () => {
    spawnController.clearDead();
    spawnController.spawn(RoleName.HARVESTER, 5, [WORK, CARRY, MOVE, MOVE]);
    spawnController.spawn(RoleName.UPGRADER, 3, [WORK, WORK, CARRY, MOVE]);
    spawnController.spawn(RoleName.BUILDER, 1, [WORK, WORK, CARRY, MOVE]);
    for(const name in Game.creeps) {
      const creep = Game.creeps[name];
      const creepRole = creep.memory.role;
      (roles[creepRole] as any).run(creep)
    }
  }
);


export {
  loop
}
