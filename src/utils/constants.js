export const CELL_WIDTH = 50;
export const STEP = 5;
export const HISTORY_LENGTH = 100;
export const FPS = 1;
export const PLAYER_COLOR = 'yellow';
export const FOOD_COLOR = 'yellow';
export const FOOD_SIZE = CELL_WIDTH / 8;
export const HUNTER_COLOR = 'blue';

export const WINDOW_WIDTH = 950;
export const WINDOW_HEIGHT = 750;
export const BACKGROUND = 'black';
export const WALL_COLOR = 'rgba(255,131,73,1)';

//directions
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';



export const DIRECTION_MAPPING = {
    UP: { axis: 'y', direction_on_axis: -1 },
    DOWN: { axis: 'y', direction_on_axis: 1 },
    LEFT: { axis: 'x', direction_on_axis: -1 },
    RIGHT: { axis: 'x', direction_on_axis: 1 }
};