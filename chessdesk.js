let neighboursChess = [];
let currentChess = 0;
let currentChessParent = 0;
let nextSpin = 'blue';
const neighbElem = [-7, -9, 7, 9];
function chessdesk() {
    const testArray = [0, 1, 2, 5, 6, 7];
    const cell = document.getElementById("cells");
    console.log(cell.getAttribute('data-test'))
    let x = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            if (x % 2 == 0) {
                let black = document.createElement("div");
                black.className = "blackcell";
                black.id = 8 * i + j;
                black.setAttribute('onclick', 'chessBlackClick(this)')
                cell.appendChild(black)
                testArray.forEach(element => {
                    if (i == element) {
                        let checkers = document.createElement("div");
                        checkers.setAttribute("chessid", 8 * i + j);
                        checkers.setAttribute("id", 'ch-' + (8 * i + j));
                        checkers.setAttribute('onclick', 'getChess(this)')
                        if (element > 2) {
                            checkers.className = "chekersBlue"
                        } else {
                            checkers.className = "chekers"

                        }
                        black.appendChild(checkers)
                    }
                });

            } else {
                let white = document.createElement("div")
                white.className = "whitecell"
                cell.appendChild(white)
            }
            x++;
        }
        x++;
    }
}
chessdesk();

function chessBlackClick(elem) {
    if (elem.children.length <= 0) {
        const id = Number(elem.id);

        neighboursChess.forEach((sym) => {
            if (sym == id) {                                                                                    //const runs in whole array
                const removeElementId = Number(currentChessParent) + ((id - Number(currentChessParent)) / 2);   //new location of cell if strike ahead
                const removeElementIdBack = Number(currentChessParent) - ((id - Number(currentChessParent)) / 2); //new location of cell if strike back
                console.log(document.getElementById(removeElementId))                                           //element ahaed
                console.log(document.getElementById(removeElementIdBack))                                       //element backward
                if (document.getElementById(removeElementId) != null) {                                         //condition for removing
                    console.log(document.getElementById(removeElementId))                                       //move my element
                    document.getElementById(removeElementId).innerHTML = '';                                    //strike enemies element
                }
                elem.appendChild(document.getElementById('ch-' + currentChess))
                if (document.getElementById('ch-' + currentChess).className == 'chekersBlue') {   //change color movement
                    nextSpin = 'red';                                                             //change in red
                } else {
                    nextSpin = 'blue';                                                            //change in blue
                }
            }
        })

    }
}

function getChess(elem) {
    neighboursChess = [];       //array with possible cells

    const id = elem.parentNode.id;
    currentChess = elem.getAttribute('chessid');                              //current cell
    currentChessParent = elem.parentNode.id;                                //current parent cells attribute
    neighbElem.forEach((pos) => {
        if (elem.className == "chekersBlue" && pos < 0 && nextSpin == "blue") {         //condition for blue

            const cell = document.getElementById(Number(id) + Number(pos))               //new cell in the next move go ahead
            console.log(cell)
            const cellBack = document.getElementById(Number(id) - Number(pos))           //new cell in the next move go backward
            console.log(cellBack)
            if (cell != null && cell.children.length <= 0) {                            //condition if dosent exist checker in nearest position
                neighboursChess.push(Number(id) + Number(pos))                          //create array with possible movable cells for blue
            } else if (cell != null && cell.children.length > 0 && cell.children[0].className == "chekers") { //condition if exist checker in nearest position
                neighboursChess.push(Number(id) + pos * 2);                               //create array with possible movable cells for blue
            }
            if (cellBack != null && cellBack.children.length > 0 && cellBack.children[0].className == "chekers") {// write value in array for possibility to strike back
                neighboursChess.push(Number(id) - pos * 2);
            }

        } else if (elem.className == "chekers" && pos > 0 && nextSpin == 'red') {       //condition for red

            const cell = document.getElementById(Number(id) + Number(pos))              //new cell in the next move
            const cellBack = document.getElementById(Number(id) - Number(pos))          //new cell in the next move go backward
            if (cell != null && cell.children.length <= 0) {                            //condition if dosent exist checker in nearest position
                neighboursChess.push(Number(id) + Number(pos))                          //create array with possible movable cells for red
                console.log(neighboursChess);
            } else if (cell != null && cell.children.length > 0 && cell.children[0].className == "chekersBlue") { //condition if exist checker in nearest position
                neighboursChess.push(Number(id) + pos * 2);                              //create array with possible movable cells for red
                console.log(neighboursChess);
            }
            if (cellBack != null && cellBack.children.length > 0 && cellBack.children[0].className == "chekersBlue") {// write value in array for possibility to strike backgi
                neighboursChess.push(Number(id) - pos * 2);
                console.log(neighboursChess);
            }
        }

    })
    console.log(neighboursChess)
}
