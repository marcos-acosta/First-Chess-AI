# TutorAI
This was my high school senior capstone project, which was to create an instructional chess engine using minimax and pruning techniques.

# How does it work?
Glad you asked!
TutorAI uses existing JavaScript libraries like chess.js and chessboard.js to display the board and recognize the rules, and from there a combination of minimax trees and pruning methods, along with a board evaluation method, to come up with (what TutorAI thinks is) the best move. The piece de resistance, however, is the little menu at the bottom which allows the user to see what the engine believes the future moves from both sides will be along with a brief description of the materialistic and positional advantages of each group of pieces. Try it out!

# Why is it so slow sometimes?
Well, this is a first attempt so there's plenty of room for improvement :)
It would have been faster if programmed in Java, but still, not by very much of a margin. I think instead that there's systematic inefficiency in how possible moves are stored and generated, and while a lot of progress was made (first test, each move took at least a minute / crashed the browser!) there's still too much lag between the player's move and the engine's move so I'll consider other methods next time. That is, creating harsher pruning methods that can cut down the size of the tree and explore deeper move sequences without increasing the lag.

# What's up with some wonky moves predicted by the AI in the explanation tab?
Yes, why does TutorAI fear that in four moves you will capture a protected pawn with his queen? It simply can't look one ply ahead to realize that this would be a tremendously bad move for you. In other words, TutorAI tries to minimize the chances of you taking any piece if possible– a very defensive style, I'd call it :)

# Can it beat me?
Find out! I'm pretty experienced and I have to make a conscious effort to win and if I'm not careful TutorAI can force some material out of me. It's no Deep Blue but it's a start!