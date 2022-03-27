## Mine sweeper

Played first time in windows XP, those days I didn't knew how to play this game. But now nowing to play this game, this is too adictive. As a fan of this game, for this project I wanted to create a replica of this game with my own personality on it. I will be documenting this development process by commiting the progress in this readme :D

#### Day Zero

Today I have created the spirits for the tiles for this game on the sprit dir. You can have a look at different square tiles for mines, grass, groud after mining(beown for the effect of plouging) and tiles with flag.


For the js part, I have created a function called randAry(a,b) which randomly creates a array of size with size a and with randomly placed b number of bombs which is denoted by '1' and rest denoted by '0'.

#### Day One

Today I made a bunch of functions that finds the boundary conditions for the grid. And another function that puts numbers in grid cell which touches the border of bomb\(-1\).
