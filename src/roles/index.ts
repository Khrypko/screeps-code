import {Role, RoleName} from 'RoleTypes'
import builder from './builder';
import harvester from './harvester';
import transporter from './transporter'
import upgrader from './upgrader';



const roles: Record<RoleName, Role> = {
  [RoleName.BUILDER]: builder,
  [RoleName.HARVESTER]: harvester,
  [RoleName.UPGRADER]: upgrader,
  [RoleName.OTHER_HARVESTER]: harvester,
  [RoleName.TRANSPORTER]: transporter
};

export default roles;
