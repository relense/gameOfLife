export default class Universe {
  constructor(generation = 0, liveCells = new Map()) {
    this.generation = generation;
    this.liveCells = liveCells;
    this.nextGeneration = new Map();
  }

  getGeneration() {
    return this.generation;
  }

  getLiveCells() {
    return this.liveCells;
  }

  addCell(position) {
    this.liveCells.set(position, true);
  }

  removeCell(position) {
    this.liveCells.delete(position);
  }

  isCellAlive(position) {
    return this.liveCells.has(position);
  }

  storeCell(position) {
    if(this.isCellAlive(position)) {
      this.removeCell(position);
    } else {
      this.addCell(position);
    }

    return new Universe(this.generation, this.liveCells);
  }

  addGeneration() {
    for(var i = 0; i < 200; i++){
      for(var j = 0; j < 200; j++){
          this.calculateNeighboors({x: i, y: j});
      }
    }

    this.generation++;

    return new Universe(this.generation, this.nextGeneration);
  }

  calculateNeighboors(position) {
    var liveNeighboors = 0;

    for(var i = position.x - 1; i <= position.x + 1; i++){
      for(var j = position.y - 1; j <= position.y + 1; j++){
        if(this.isCellAlive(i + " , " + j)){
          if(i === position.x && j === position.y){
            continue;
          } else {
            liveNeighboors++;
          }
        }
      }
    }

    if(this.isCellAlive(position.x + " , " + position.y)) {
      console.log("live: " + liveNeighboors)
      if((liveNeighboors === 2 || liveNeighboors === 3))
        this.nextGeneration.set(position.x + " , " + position.y, true);

    } else {
      if(liveNeighboors === 3)
        this.nextGeneration.set(position.x + " , " + position.y, true);
    }

  }

}
