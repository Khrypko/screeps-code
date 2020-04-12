import { Role, RoleName } from "RoleTypes";
import builder from './builder';
import harvester from './harvester';
import upgrader from './upgrader';

const roles: Record<RoleName, Role> = {
  [RoleName.BUILDER]: builder,
  [RoleName.HARVESTER]: harvester,
  [RoleName.UPGRADER]: upgrader
};

export default roles;
