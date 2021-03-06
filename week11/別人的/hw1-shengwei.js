var correct_puz = [[0, 1, 2],
[3, 4, 5],
[6, 7, "*"]]

var start_puz =
    [[1, 6, 2],
    [0, 3, 4],
    [7, "*", 5]]
var start_x = 2 //0的位址 x代表一維的
var start_y = 1 //0的位址 y代表二維的
var dir = 1
var obj = []
obj.push({ puzzle: start_puz, dir: 0, x: start_x, y: start_y, old_puzzle: null })
function search(obj) { //傳入陣列 0的位置 方向 廣度搜尋
    var old_obj = obj.shift() //從物件裡面取最前面的的出來
    if (old_obj.puzzle.toString() == correct_puz.toString()) {
        var str = '---------\n'
        for (var r = 0; r < 3; r++) {
            str += "|" + ' ' + old_obj.puzzle[r].join(' ') + ' ' + "|" + '\n'
        }
        str += '---------'
        console.log(str)
        return old_obj.old_puzzle
    }
    var x = old_obj.x, y = old_obj.y
    var memory;
    if (old_obj.dir != 3) { //如果上一次走的不是上面(避免換到一樣的)，那就把0跟上面那個調換
        // var new_obj = Object.assign({}, old_obj); //創一個新的obj來存改變位置過的內容 
        var new_obj = JSON.parse(JSON.stringify(old_obj))
        //==========1234 分別代表 上右下左=========
        if (x - 1 >= 0) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x - 1][y]
            new_obj.puzzle[x - 1][y] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 1
            new_obj.x = x - 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    if (old_obj.dir != 4) { 
        var new_obj = JSON.parse(JSON.stringify(old_obj)) //複製一個新的json
        if (y + 1 <= 2) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x][y + 1]
            new_obj.puzzle[x][y + 1] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 2
            new_obj.y = y + 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    if (old_obj.dir != 1) { 
        var new_obj = JSON.parse(JSON.stringify(old_obj))
        if (x + 1 <= 2) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x + 1][y]
            new_obj.puzzle[x + 1][y] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 3
            new_obj.x = x + 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    if (old_obj.dir != 2) { 
        var new_obj = JSON.parse(JSON.stringify(old_obj))
        if (y - 1 >= 0) { //如果是可以換得就把他換了然後丟進obj裡面
            memory = new_obj.puzzle[x][y - 1]
            new_obj.puzzle[x][y - 1] = new_obj.puzzle[x][y]
            new_obj.puzzle[x][y] = memory
            new_obj.dir = 4
            new_obj.y = y - 1
            new_obj.old_puzzle = old_obj.puzzle
            obj.push(new_obj)
        }
    }
    var result = search(obj)
    if (result != null) {
        if (result.toString() == old_obj.puzzle.toString()) {
            var str = '---------\n'
            for (var r = 0; r < 3; r++) {
              str += "|" + ' ' + result[r].join(' ') + ' ' + "|" + '\n'
            }
            str += '---------'
            console.log(str)
            return old_obj.old_puzzle
        }
        else
        return result
    }
}
search(obj)