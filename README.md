# "Connect 4"

## Craniometrix Takehome

## Zach Blume

### To run the application

Go to 

### Here's my React approach:

-   I forgot how connect 4 works until being 80% done and remembering that columns matter more than rows. Awkward! I might have done this differently if I had thought of that :)
-   I **lifted state up** from tile to a global board state
-   I **used reducers** instead of useState for dispatch simplicity
-   I used a **Functional approach** to one of the reducers (a f that returns a f) to allow the **reducers to be chained without re-rendering** the functions to be an issue.
-   I **used Context instead of prop-drilling** to pass state and mutators all the way to the tile and to other components, (1) to show I know how even though this is a very simple toy application and (2) because this design pattern allows for declarative consumption of state instead of impertively passing it down each level.
-   I **used Framer Motion for some cute animations** on initialization/reset and the tile dropping down.
-   I **optimized for mobile display** with css adjustments
-   I **opted to use raw CSS instead of my normal Tailwind usage**, because I figured it would help you see I can write CSS.
-   On the design front, this is not my most beloved design style. However, as someone who is not accustomed to designing games, I decided to try and **stretch and show some flexibility**. I decided that (1) bold color, (2) fidelity to the original connect 4 colors were the most important things. **Lastly I decided to add a single flair: the impactful classic game font used in the header (imported from Google fonts).**
-   The last two UI decisions I made were:
    -   if you simply switched the "current player name" in-place without movement, it was hard to notice. So I opted to _always_ show both names and create some visual movement and color to signify turn-changing.
    -   I added a subtle background highlight on hover of each tile, so you could "feel" a little more interactivity'

### Here's my algorithmic approach:

-   Instead of algorithmically solving this game (the optimal time complexity solution is actually fairly complicated, to use the right data structure to solve this incrementally and not re-do work each move), **I pre-calculate an array of all the winning states (168)**.
-   Instead of the naive approach of storing a global state with an array of arrays and three states (nothing, player1, player2), **I store each players state seperately inside a global array of players (const board) as an array where the position is the key and the presence of a tile for that player is a Boolean, so board[playerName][position]=true|undefined;**
-   To store a hashmap this way, I avoid typescript/JS's built in Map function because the .get()/.has() uses simple equality checking, so you can't Map.get(object) because the object is a reference type and a object is a new reference that doesn't pass _object reference equality_
-   So, **I made a little library of two functions, hash2DPositionTo1d() and unHashPosition() and then just use an array instead of a Map since all the keys are 1d Numerical positions.**
-   This solution means no work is being done on each re-render except for a loop of the 168 \* 4 winning states's four necessary tile conditions. Because the positions are stored in the global board state as a hash, each lookup is O(1) so this is simple and fast.
-   **The only complexity that this data structure choice results in is**: checking for where to place the next tile in the clicked column requires a loop through the current board and counting whether current tile placements land in the column. Since un-placed tiles simply aren't mapped yet in our state array, however, we're not looping through every tile on the board, but just those that have already been placed.
