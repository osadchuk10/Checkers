let neighboursChess = [];
let currentChess = 0;
let currentChessParent = 0;
let nextSpin = { 'color': 'chekersBlue', 'id': undefined };
const neighbElem = [-7, -9, 7, 9];
const queenArray = [];
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
    if (nextSpin.color !== currentChess.className) return;
    if (elem.children.length <= 0) {
        const id = Number(elem.id);
        neighboursChess.forEach((symbol) => {
            if (symbol.id == id) {
                if (symbol.back && symbol.type == 'empty' && symbol.color == 'chekers') return;
                if (!symbol.back && symbol.type == 'empty' && symbol.color == 'chekersBlue') return;
                const removeElementId = Number(currentChessParent) + ((id - Number(currentChessParent)) / 2);
                const removedElement = document.getElementById(removeElementId);
                if (document.getElementById('ch-' + currentChess.getAttribute('chessid')).className == 'chekersBlue') {
                    nextSpin.color = "chekers";
                    nextSpin.id = undefined;
                } else {
                    nextSpin.color = "chekersBlue";
                    nextSpin.id = undefined;
                }
                console.log("nextSpin", nextSpin)
                if (removedElement !== null) {
                    const childEl = removedElement.children[0].className;
                    if (symbol.type == 'strike' && symbol.color == 'chekersBlue' && childEl == 'chekersBlue') return;
                    if (symbol.type == 'strike' && symbol.color == 'chekers' && childEl == 'chekers') return;
                    if (symbol.type == 'strikeBack' && symbol.color == 'chekers' && childEl == 'chekers') return;
                    if (symbol.type == 'strikeBack' && symbol.color == 'chekersBlue' && childEl == 'chekersBlue') return;
                    elem.appendChild(document.getElementById('ch-' + currentChess.getAttribute('chessid')))
                    removedElement.innerHTML = '';
                    nextSpin.id = undefined;
                    this.getChess(document.getElementById('ch-' + currentChess.getAttribute('chessid')));
                    neighboursChess.forEach((sym) => {
                        if (sym.color != sym.naighbour && sym.type != 'empty') {
                            nextSpin.id = currentChess.getAttribute('chessid');
                            nextSpin.color = symbol.color;
                            console.log("sadf", nextSpin.color);
                        }
                    })
                } else {
                    elem.appendChild(document.getElementById('ch-' + currentChess.getAttribute('chessid')))
                }
            }
        })
    }
}
function getChess(elem) {
    console.log(nextSpin.id)
    if (nextSpin.id != undefined && nextSpin.id != currentChess.id) {
        return
    }
    neighboursChess = [];
    let chessData = {}
    neighboursChess = [];
    const id = elem.parentNode.id;
    currentChess = elem;
    currentChessParent = elem.parentNode.id;
    neighbElem.forEach((pos) => {
        const cell = document.getElementById(Number(id) + Number(pos))
        const cellBack = document.getElementById(Number(id) - Number(pos))
        if (cell != null && cell.children.length <= 0 && Number(id) + Number(pos) < 64 && Number(id) + Number(pos) >= 0) {
            chessData = { 'color': elem.className, 'type': 'empty', 'id': Number(id) + Number(pos), 'back': pos < 0, 'naighbour': '' }
            neighboursChess.push(chessData)
        } else if (cell != null && cell.children.length > 0 && Number(id) + pos * 2 < 64 && Number(id) + pos * 2 > 0) {
            if (document.getElementById(Number(id) + pos * 2) != undefined && document.getElementById(Number(id) + pos * 2).children.length === 0) {
                chessData = { 'color': elem.className, 'type': 'strike', 'id': Number(id) + pos * 2, 'back': pos < 0, 'naighbour': cell.children[0].className }
                neighboursChess.push(chessData)
            }
        } else if (cellBack != null && cellBack.children.length > 0 && Number(id) - pos * 2 <= 0 && Number(id) - pos * 2 < 64) {
            chessData = { 'color': cellBack.children[0].className, 'type': 'strikeBack', 'id': Number(id) - pos * 2, 'back': pos < 0, 'naighbour': cellBack.children[0].className }
            neighboursChess.push(chessData)
        }
    })
    console.log(neighboursChess)
}
