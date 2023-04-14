# craniometrix-takehome-zb

I'm going to use a global object to store the position state of the players, with playerName as key.
Storing each player's state seperately abstracts away the complexity of 3 states as options:
ex. [no-one, p1, p2] as possible states

Additionally, that lets us store things a little 'backwards' for faster lookups.

Instead of storing the entire table state as values, we can use the position as a key in a hash table.

I'll use a reducer to mutate the global object state of the players positions, and helpers:

-   check if there's a winner.
-   to check if there's a stalemate.
-   to check if the game is over.

Before UI rendering, I'll calculate all the winning states and store them as an array.

To figure out if the each player is in a winning state, I'll check if the player's positions
are present in the winning state array (by iterating through the winning array).
