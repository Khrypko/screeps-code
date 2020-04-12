export interface Role {
  run: (creep: Creep) => void
}

export enum RoleName {
  HARVESTER = "HARVESTER",
  BUILDER = "BUILDER",
  UPGRADER = "UPGRADER",
  OTHER_HARVESTER = "OTHER_HARVESTER"
}
