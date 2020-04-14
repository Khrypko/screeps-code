import {RoleName} from 'RoleTypes'
import settings from '../settings'
const {spawn} = settings;

interface SpawnController {
  clearDead: () => void;
  spawn: (role: RoleName, amount: number, bodyParts: BodyPartConstant[]) => void;
}

const spawnController: SpawnController = {
  clearDead: () => {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }
  },

  spawn: (role, creepsAmount, bodyParts) => {
    if (role === RoleName.BUILDER && !Game.spawns[spawn].room.find(FIND_CONSTRUCTION_SITES).length) return;
    const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);
    if (creeps.length < creepsAmount) {
      const name = role + Game.time;
      Game.spawns[spawn].spawnCreep(bodyParts, name, {memory: {role}});
    }
  },

};


export default spawnController;
