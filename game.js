

var symbols = ["*", "&", "+", "#", "!", "|", "-", "/", "~", "<", ">", "@", "€", "$", "^", "?",
               "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "Q", "W", "Z", "S"
              ];
function isExist (finished, coorX, coorY){
  var result;
  for (value in finished){
    if (finished[value].coorX == coorX && finished[value].coorY == coorY) {
      result = true;
      break;
    }else result = false;
  }
  return result;
}
function symbolGenerate(){
  return symbols.splice(Math.floor(Math.random() * symbols.length), 1)[0];
}
function createBoard(boardSize){
  var counter = 0;
  if (boardSize % 2 == 1 || boardSize == undefined){
    return -1;
  }else{
    var finished = [];
    var symbol = symbolGenerate();
    while (finished.length != boardSize*boardSize){
      var coorX = Math.floor(Math.random() * boardSize);
      var coorY = Math.floor(Math.random() * boardSize);
      if (!isExist(finished, coorX, coorY)){
        if (counter == 2){
          counter = 0;
          symbol = symbolGenerate();
        }
        var cell = new Cell(coorX, coorY, symbol);
        counter++;
        finished.push(cell);
      }
    }
  }
  return finished;
}
function findCell(cells, coorX, coorY){
  for (var i = 0; i < cells.length; i++){
    if (cells[i].coorX == coorX && cells[i].coorY == coorY) break;
  }
  return i;
}
var oldCoor = null;
function controlCell(coor){
  if (oldCoor == null) {
      oldCoor = coor;
      return;
  }else{
    if (oldCoor.symbol == coor.symbol){
      oldCoor.found = true;
      coor.found = true;
      oldCoor = null;
      return true;
    }else {
      console.log(oldCoor)
      oldCoorTemp = oldCoor;
      oldCoor = null;
      return oldCoorTemp;
    }
  }
}

function foundSymbol(cells){
  var finishCounter = 1;
  for (var i = 1; i < cells.length; i++){
    if (cells[i].found == false) break;
    else finishCounter++;
  }
  return finishCounter;
}