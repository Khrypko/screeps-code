// example declaration file - remove these and add your own custom typings

// memory extension samples
declare namespace Roles {
  enum RoleName {
    HARVESTER = "HARVESTER",
    BUILDER = "BUILDER",
    UPGRADER = "UPGRADER",
    OTHER_HARVESTER = "OTHER_HARVESTER"
  }
}

interface CreepMemory {
  role: Roles.RoleName;
  building?: boolean;
  upgrading?: boolean;
  harvesting?: boolean;
  transferring?: boolean;
  otherSource?: boolean;
}

interface Memory {
  uuid: number;
  log: any;
  creeps: Creep[]
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
