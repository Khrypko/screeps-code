// example declaration file - remove these and add your own custom typings

// memory extension samples
declare namespace Roles {
  enum RoleName {
    HARVESTER = "HARVESTER",
    BUILDER = "BUILDER",
    UPGRADER = "UPGRADER"
  }
}

interface CreepMemory {
  role: Roles.RoleName;
  building?: boolean;
  upgrading?: boolean;
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
