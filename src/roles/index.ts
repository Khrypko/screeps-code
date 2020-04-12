import { Role, RoleName } from "RoleTypes";
import builder from './builder'
import harvester from './harvester'
import upgrader from './upgrader'

type Roles = {
  [key in RoleName]?: Role
}

const roles: Roles = {
  [RoleName.BUILDER]: builder,
  [RoleName.HARVESTER]: harvester,
  [RoleName.UPGRADER]: upgrader
};

export default roles;
