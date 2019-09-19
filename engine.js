var Engine = function (initDepth, initGame) {
    //RATIO OF MATERIAL VALUE TO POSITIONAL WEIGHT
    var MATERIAL_SCALE = 5;

    //POSITIONAL VALUES FOR EACH PIECE TYPE
    var KING_POSITIONS = [
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
        [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
        [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
        [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
    ];

    var QUEEN_POSITIONS = [
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
        [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    ];

    var ROOK_POSITIONS = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
        [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
    ];

    var BISHOP_POSITIONS = [
        [- 2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
        [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
        [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
        [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
        [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
        [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    ];

    var KNIGHT_POSITIONS = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
        [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
        [- 3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
        [-3.0, 0.0, 1.0, 2.0, 2.0, 1.0, 0.0, -3.0],
        [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
        [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    ];

    var PAWN_POSITIONS = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    ];
    
    var ALL_POSITIONS = [PAWN_POSITIONS, KNIGHT_POSITIONS, BISHOP_POSITIONS, QUEEN_POSITIONS, ROOK_POSITIONS, KING_POSITIONS];

    var depth = initDepth;
    var game = initGame;

    //PIECE RAW VALUES
    const PAWN_VALUE = 1;
    const KNIGHT_VALUE = 3.5;
    const BISHOP_VALUE = 3.5;
    const ROOK_VALUE = 5.25;
    const QUEEN_VALUE = 10;
    const KING_VALUE = 999;

    function topLevelMinimax(root, d, alpha, beta, maximizingPlayer) {
        //If depth is 0 or game is over, return static evaluation
        if (d === 0 || root.game_over()) {
            return evaluate(root);
        }
        var allMoves = root.simple_moves();
        var eval;
        var bestEval;
        var bestMoveIndex = -1;
        var bestMoveValue;
        var bestBoard = null;
        var temp_board;
        var roof = allMoves.length;
        var moves_made = [];
        //If white
        if (maximizingPlayer === true) {
            bestMoveValue = -Infinity;
            bestEval = -Infinity;
            for (var i = 0; i < roof; i++) {
                temp_board = root.copy_of().move(allMoves[i]);
                eval = minimax(temp_board, d - 1, alpha, beta, false, temp_board);
                if (eval[0] > bestMoveValue) {
                    bestMoveValue = eval[0];
                    bestBoard = eval[1];
                    bestMoveIndex = i;
                }
                bestEval = Math.max(bestEval, eval[0]);
                alpha = Math.max(alpha, eval[0]);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        //If black
        else {
            bestMoveValue = Infinity;
            bestEval = Infinity;
            for (var i = 0; i < roof; i++) {
                temp_board = root.copy_of().move(allMoves[i]);
                eval = minimax(temp_board, d - 1, alpha, beta, true, temp_board);
                if (eval[0] < bestMoveValue) {
                    bestMoveValue = eval[0];
                    bestBoard = eval[1];
                    bestMoveIndex = i;
                }
                bestEval = Math.min(bestEval, eval[0]);
                beta = Math.min(beta, eval[0]);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return [bestMoveIndex, bestBoard];
    }

    //Perform minimax and alpha-beta pruning on a search tree of depth d
    function minimax(root, d, alpha, beta, maximizingPlayer, bestBoard) {
        //If depth is 0 or game is over, return static evaluation
        if (d === 0 || root.game_over()) {
            return [evaluate(root), bestBoard];
        }
        var allMoves = root.simple_moves();
        var eval;
        var bestEval;
        var roof = allMoves.length;
        var temp_board;
        //If white
        if (maximizingPlayer === true) {
            bestEval = -Infinity;
            //Go through all children
            for (var i = 0; i < roof; i++) {
                temp_board = root.copy_of().move(allMoves[i]);
                eval = minimax(temp_board, d - 1, alpha, beta, false, bestBoard);
                if (eval[0] > bestEval) {
                    bestEval = eval[0];
                    if (d === 1) {
                        bestBoard = temp_board;
                    } else {
                        bestBoard = eval[1];
                    }
                }
                alpha = Math.max(alpha, eval[0]);
                if (beta <= alpha) {
                    break;
                }
            }
            return [bestEval, bestBoard];
        }
        //If black
        else {
            bestEval = Infinity;
            //Go through all children
            for (var i = 0; i < roof; i++) {
                temp_board = root.copy_of().move(allMoves[i]);
                eval = minimax(temp_board, d - 1, alpha, beta, true, bestBoard);
                if (eval[0] < bestEval) {
                    bestEval = eval[0];
                    if (d === 1) {
                        bestBoard = temp_board;
                    } else {
                        bestBoard = eval[1];
                    }
                }
                beta = Math.min(beta, eval[0]);
                if (beta <= alpha) {
                    break;
                }
            }
            return [bestEval, bestBoard];
        }
    }

    //Returns the evaluation of a board, considering checkmate and stalemate
    function evaluate(board) {
        if (board.in_checkmate() === true) {
            if (board.turn() == 'w') {
                return -Infinity;
            } else {
                return Infinity;
            }
        }
        if (board.in_draw() == true) {
            return 0;
        }

        // Do a positional evaluation
        return positional_evaluation(board);
    }

    function material_evaluation(board) {
        var eval = 0;
        var square;
        var letters = 'abcdefgh';
        for (var i = 0; i < 8; i++) {
            for (var j = 1; j < 9; j++) {
                square = board.get(letters.substring(i, i + 1) + j);
                if (square != null) {
                    if (square.color === 'w') {
                        if (square.type === 'r') {
                            eval += ROOK_VALUE;
                        } else if (square.type === 'n') {
                            eval += KNIGHT_VALUE;
                        } else if (square.type === 'b') {
                            eval += BISHOP_VALUE;
                        } else if (square.type === 'q') {
                            eval += QUEEN_VALUE;
                        } else if (square.type === 'k') {

                        } else {
                            eval += PAWN_VALUE;
                        }
                    } else {
                        if (square.type === 'r') {
                            eval -= ROOK_VALUE;
                        } else if (square.type === 'n') {
                            eval -= KNIGHT_VALUE;
                        } else if (square.type === 'b') {
                            eval -= BISHOP_VALUE;
                        } else if (square.type === 'q') {
                            eval -= QUEEN_VALUE;
                        } else if (square.type === 'k') {

                        } else {
                            eval -= PAWN_VALUE;
                        }
                    }
                }
            }
        }
        return eval;
    }

    //Evaluates the current board using piece values and positional weight
    function positional_evaluation(board) {
        var eval = 0;
        var letters = 'abcdefgh';
        var square;
        for (var i = 0; i < 8; i++) {
            for (var j = 1; j < 9; j++) {
                square = board.get(letters.substring(i, i + 1) + j);
                if (square != null) {
                    if (square.color === 'w') {
                        if (square.type === 'r') {
                            eval += ROOK_VALUE + ROOK_POSITIONS[8 - j][i] / MATERIAL_SCALE;
                        } else if (square.type === 'n') {
                            eval += KNIGHT_VALUE + KNIGHT_POSITIONS[8 - j][i] / MATERIAL_SCALE;
                        } else if (square.type === 'b') {
                            eval += BISHOP_VALUE + BISHOP_POSITIONS[8 - j][i] / MATERIAL_SCALE;
                        } else if (square.type === 'q') {
                            eval += QUEEN_VALUE + QUEEN_POSITIONS[8 - j][i] / MATERIAL_SCALE;
                        } else if (square.type === 'k') {
                            eval += KING_POSITIONS[8 - j][i] / MATERIAL_SCALE;
                        } else {
                            eval += PAWN_VALUE + PAWN_POSITIONS[8 - j][i] / MATERIAL_SCALE;
                        }
                    } else {
                        if (square.type === 'r') {
                            eval -= (ROOK_VALUE + ROOK_POSITIONS[j - 1][7 - i] / MATERIAL_SCALE);
                        } else if (square.type === 'n') {
                            eval -= (KNIGHT_VALUE + KNIGHT_POSITIONS[j - 1][7 - i] / MATERIAL_SCALE);
                        } else if (square.type === 'b') {
                            eval -= (BISHOP_VALUE + BISHOP_POSITIONS[j - 1][7 - i] / MATERIAL_SCALE);
                        } else if (square.type === 'q') {
                            eval -= (QUEEN_VALUE + QUEEN_POSITIONS[j - 1][7 - i] / MATERIAL_SCALE);
                        } else if (square.type === 'k') {
                            eval -= (KING_POSITIONS[j - 1][7 - i] / MATERIAL_SCALE);
                        } else {
                            eval -= (PAWN_VALUE + PAWN_POSITIONS[j - 1][7 - i] / MATERIAL_SCALE);
                        }
                    }
                }
            }
        }
        return eval;
    }

    function new_evaluation(board, move) {

    }

    function positional_explanation(board1, board2) {
        //[x][y][z], x = white / black, y = first board / second board, z = piece typw
        //0: white pawn, 1: white rook, 2: white knight, 3: white bishop, 4: white queen, 5: white king, repeat for black
        var exp = "";
        var black_white = [false, false];
        var piece_names = ["Pawn(s)", "Rook(s)", "Knight(s)", "Bishop(s)", "Queen(s)", "King"];
        var color_names = ["WHITE", "BLACK"];
        var better_worse = ["worse", "better"];
        var mat_evals = [[[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]];
        var pos_evals = [[[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]];
        var letters = 'abcdefgh';
        var mat_dif = 0;
        var pos_dif = 0;
        for (var h = 0; h < 2; h++) {
            for (var i = 0; i < 8; i++) {
                for (var j = 1; j < 9; j++) {
                    if (h == 0) {
                        square = board1.get(letters.substring(i, i + 1) + j);
                    } else {
                        square = board2.get(letters.substring(i, i + 1) + j);
                    }
                    if (square != null) {
                        if (square.color === 'w') {
                            if (square.type === 'r') {
                                mat_evals[0][h][1] += ROOK_VALUE;
                                pos_evals[0][h][1] += ROOK_POSITIONS[8 - j][i];
                            } else if (square.type === 'n') {
                                mat_evals[0][h][2] += KNIGHT_VALUE;
                                pos_evals[0][h][2] += KNIGHT_POSITIONS[8 - j][i];
                            } else if (square.type === 'b') {
                                mat_evals[0][h][3] += BISHOP_VALUE;
                                pos_evals[0][h][3] += BISHOP_POSITIONS[8 - j][i];
                            } else if (square.type === 'q') {
                                mat_evals[0][h][4] += QUEEN_VALUE;
                                pos_evals[0][h][4] += QUEEN_POSITIONS[8 - j][i];
                            } else if (square.type === 'k') {
                                mat_evals[0][h][5] += KING_VALUE;
                                pos_evals[0][h][5] += KING_POSITIONS[8 - j][i];
                            } else {
                                mat_evals[0][h][0] += PAWN_VALUE;
                                pos_evals[0][h][0] += PAWN_POSITIONS[8 - j][i];
                            }
                        } else {
                            if (square.type === 'r') {
                                mat_evals[1][h][1] -= ROOK_VALUE;
                                pos_evals[1][h][1] -= ROOK_POSITIONS[j - 1][7 - i];
                            } else if (square.type === 'n') {
                                mat_evals[1][h][2] -= KNIGHT_VALUE;
                                pos_evals[1][h][2] -= KNIGHT_POSITIONS[j - 1][7 - i];
                            } else if (square.type === 'b') {
                                mat_evals[1][h][3] -= BISHOP_VALUE;
                                pos_evals[1][h][3] -= BISHOP_POSITIONS[j - 1][7 - i];
                            } else if (square.type === 'q') {
                                mat_evals[1][h][4] -= QUEEN_VALUE;
                                pos_evals[1][h][4] -= QUEEN_POSITIONS[j - 1][7 - i];
                            } else if (square.type === 'k') {
                                mat_evals[1][h][5] -= KING_VALUE;
                                pos_evals[1][h][5] -= KING_POSITIONS[j - 1][7 - i];
                            } else {
                                mat_evals[1][h][0] -= PAWN_VALUE;
                                pos_evals[1][h][0] -= PAWN_POSITIONS[j - 1][7 - i];
                            }
                        }
                    }
                }
            }
        }
        for (var i = 1; i > -1; i--) {
            for (var j = 0; j < 6; j++) {
                //Consider difference in material
                mat_dif = mat_evals[i][1][j] - mat_evals[i][0][j];
                //Consider difference in position
                pos_dif = pos_evals[i][1][j] - pos_evals[i][0][j];
                //Verbalize
                if (mat_dif < 0 || pos_dif < 0) {
                    //Title for color
                    if (black_white[i] === false) {
                        exp += "<br>" + color_names[i] + ":<br>";
                        black_white[i] = true;
                    }
                    exp += "&nbsp;&nbsp;&nbsp;<font color='white'>" + piece_names[j] + ":</font><br>";
                    if (mat_dif < 0) {
                        exp += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#a7a7a7'>Materially " + better_worse[i] + "</font><br>";
                    } if (pos_dif < 0) {
                        exp += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#a7a7a7'>Positionally " + better_worse[i] + "</font><br>";
                    }
                }
            }
        }
        return exp;
    }

    //If there are commonly accepted responses to white, play one of them (else return null)
    function book_moves(board) {
        var fen = board.fen();
        var pos = fen.substring(0, fen.search(' '));
        var rand;
        var good_moves;
        //King's pawn
        if (pos === 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR') {
            good_moves = [{ from: 'c7', to: 'c5', promotion: 'q' }, { from: 'e7', to: 'e5', promotion: 'q' }, { from: 'e7', to: 'e6', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        //Queen's pawn
        else if (pos === 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR') {
            good_moves = [{ from: 'g8', to: 'f6', promotion: 'q' }, { from: 'd7', to: 'd5', promotion: 'q' }, { from: 'd7', to: 'd6', promotion: 'q' }, { from: 'e7', to: 'e6', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        //Reti
        else if (pos === 'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R') {
            good_moves = [{ from: 'g8', to: 'f6', promotion: 'q' }, { from: 'd7', to: 'd5', promotion: 'q' }, { from: 'c7', to: 'c5', promotion: 'q' }, { from: 'g7', to: 'g6', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        //English
        else if (pos === 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR') {
            good_moves = [{ from: 'g8', to: 'f6', promotion: 'q' }, { from: 'e7', to: 'e5', promotion: 'q' }, { from: 'e7', to: 'e6', promotion: 'q' }, { from: 'c7', to: 'c5', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        //C40: King's pawn
        else if (pos === 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R') {
            good_moves = [{ from: 'b8', to: 'c6', promotion: 'q' }, { from: 'd7', to: 'd6', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        //B27 Sicilian
        else if (pos === 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R') {
            good_moves = [{ from: 'd7', to: 'd6', promotion: 'q' }, { from: 'b8', to: 'c6', promotion: 'q' }, { from: 'e7', to: 'e6', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        //C00 French defence
        else if (pos === 'rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR') {
            good_moves = [{ from: 'd7', to: 'd5', promotion: 'q' }, { from: 'c7', to: 'c5', promotion: 'q' }];
            rand = Math.floor(Math.random() * good_moves.length);
            return good_moves[rand];
        }
        else {
            return null;
        }
    }

    function compare_boards(board1, board2) {
        // 0: material difference
        // 1: master eval
        var differences = [];
        differences.push(material_evaluation(board2) - material_evaluation(board1));
        differences.push(positional_explanation(board1, board2));
        return differences;
    }

    //Makes all the moves in the move history of boardWithMoves starting with board until the buffer is reached
    function make_moves(board, boardWithMoves, buffer) {
        var moves = boardWithMoves.get_move_history();
        var temp_board = board.copy_of();
        for (var i = 0; i < moves.length - buffer; i++) {
            temp_board.move(moves[i]);
        }
        return temp_board;
    }

    //API
    return {
        //Debug
        printPossibleMoves: function () {
            var possibleMoves = game.moves();
            var str = "";
            var i;
            for (i = 0; i < possibleMoves.length; i++) {
                str = str.concat(possibleMoves[i] + " ");
            }
            return str;
        },

        //Select the best move found via minimax
        pickBestMove: function () {
            var first_board = game.copy_of();
            game.clear_history();
            var book_move = book_moves(game);
            var minimax;
            if (book_move != null) {
                return [book_move, 'book move', 'book move'];
            } else {
                minimax = topLevelMinimax(game, depth, -Infinity, Infinity, false);
                return [game.simple_moves()[minimax[0]], minimax[1], compare_boards(first_board, make_moves(first_board, minimax[1], 0))];
            }
        },
    }
};