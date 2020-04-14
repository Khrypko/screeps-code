
class CreepsCount {
  private _total: number = Object.keys(Memory.creeps).length;
  private _current: number = 0;

  public getCurrent = (): number => this._current;
  public setCurrent = (numberCreepsCount: number) => { this._current = numberCreepsCount};

  public getTotal = (): number => this._total;

  public addToCurrent = (creepsAmount: number): void => {this.setCurrent(this.getCurrent() + creepsAmount)};
  public leftCreepsToBuild = (): number => {
    return this.getTotal() - this.getCurrent();
  };
}

export default {
  CreepsCount,
  myRoomName: "W46S22",
  spawn: "Spawn1"
}


