//config
const FPS = 1;
const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 700;
const CELL_WIDTH = 50;
const BACKGROUND = 'black';
const WALL_COLOR = 'rgba(255,131,73,1)';
const HUNTER_COLOR = 'blue';
const PLAYER_COLOR = 'yellow';
const FOOD_COLOR = 'yellow';
const FOOD_SIZE = CELL_WIDTH / 8;

const MAP_ = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,0,1,0],
    [0,1,1,0,0,1,0,1,1,1,1,0,1,0,0,0,1,0],
    [0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,0],
    [0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,1,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const FINDING_GRAPH = new Graph(MAP_);


//directions
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN = 'DOWN';


//player
const STEP = 5;