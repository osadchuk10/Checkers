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
            if (sym == id) {
                const removeElementId = Number(currentChessParent) + ((id - Number(currentChessParent)) / 2);
                console.log(document.getElementById(removeElementId))
                if (document.getElementById(removeElementId) != null) {
                    console.log(document.getElementById(removeElementId))
                    document.getElementById(removeElementId).innerHTML = '';
                }
                elem.appendChild(document.getElementById('ch-' + currentChess))
                if (document.getElementById('ch-' + currentChess).className == 'chekersBlue') {
                    nextSpin = 'red';
                } else {
                    nextSpin = 'blue';
                }
            }
        })

    }
}

function getChess(elem) {
    neighboursChess = [];

    const id = elem.parentNode.id;
    currentChess = elem.getAttribute('chessid');
    currentChessParent = elem.parentNode.id;
    neighbElem.forEach((pos) => {
        if (elem.className == "chekersBlue" && pos < 0 && nextSpin == "blue") {

            const ele = document.getElementById(Number(id) + Number(pos))
            if (ele != null && ele.children.length <= 0) {
                neighboursChess.push(Number(id) + Number(pos))
            } else if (ele != null && ele.children.length > 0 && ele.children[0].className == "chekers") {

                neighboursChess.push(Number(id) + pos * 2);
            }
        } else if (elem.className == "chekers" && pos > 0 && nextSpin == 'red') {

            const ele = document.getElementById(Number(id) + Number(pos))
            if (ele != null && ele.children.length <= 0) {
                neighboursChess.push(Number(id) + Number(pos))
            } else if (ele != null && ele.children.length > 0 && ele.children[0].className == "chekersBlue") {
                neighboursChess.push(Number(id) + pos * 2);


            }
        }

    })
    console.log(neighboursChess)
}
