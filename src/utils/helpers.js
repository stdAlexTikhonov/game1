import { DIRECTION_MAPPING } from './constants';

export const setPlayerPosition = (player, MAP_) => {
    const { x, y, direction, isTurboActive } = player;
    const { axis, direction_on_axis } = DIRECTION_MAPPING[direction];
    const isX = axis === 'x';
    const isY = axis === 'y';
    const isWall = MAP_[isY ? y + direction_on_axis : y][isX ? x + direction_on_axis : x] === 0;

    if (isWall) {
        if (MAP_[isY ? y+direction_on_axis : y+1][isX ? x+direction_on_axis : x+1] === 1) {
            return { 
                y: isY ? y : y + 1,
                x: isX ? x : x + 1
            }
        } else if (MAP_[isY ? y+direction_on_axis : y-1][isX ? x+direction_on_axis : x-1] === 1) {
            return { 
                y: isY ? y : y - 1,
                x: isX ? x : x - 1
            }
        } 
    }

    return {
        x: !isWall && isX ? x + direction_on_axis : x,
        y: !isWall && isY ? y + direction_on_axis : y
    }

}

export const setHunterPosition = () => {
    //for a while
}