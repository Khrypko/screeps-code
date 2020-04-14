// example declaration file - remove these and add your own custom typings

// memory extension samples
declare namespace Types {
  enum RoleName {
    HARVESTER = "HARVESTER",
    BUILDER = "BUILDER",
    UPGRADER = "UPGRADER",
    OTHER_HARVESTER = "OTHER_HARVESTER",
    TRANSPORTER = "TRANSPORTER"
  }

  interface Role {
    run: (creep: Creep) => void
  }
}

interface CreepMemory {
  role: Types.RoleName;
  building?: boolean;
  upgrading?: boolean;
  harvesting?: boolean;
  transferring?: boolean;
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
