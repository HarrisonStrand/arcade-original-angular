import * as p5 from 'p5';
import Key from './key';

function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

export const lineIntersect = (l1v1, l1v2, l2v1, l2v2) => {
  let base = p5.Vector.sub(l1v1, l2v1);
  let l1_vector = p5.Vector.sub(l1v2, l1v1);
  let l2_vector = p5.Vector.sub(l2v2, l2v1);
  let direction_cross = cross(l2_vector, l1_vector);

  let t = cross(base, l1_vector) / direction_cross;
  let u = cross(base, l2_vector) / direction_cross;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return true;
  } else {
    return false
  }
}

export const collide = (obstacle, snake) => {
    let axisHit = {
      totalDist: false,
      x: 0,
      y: 0,
    };

    const end_of_array = snake.body.length - 1;
    const distx =
      (snake.body[end_of_array].x - obstacle.pos.x) *
      (snake.body[end_of_array].x - obstacle.pos.x);
    const disty =
      (snake.body[end_of_array].y - obstacle.pos.y) *
      (snake.body[end_of_array].y - obstacle.pos.y);

    const dist = distx + disty;

    if (
      distx >
      (obstacle.r + snake.body[end_of_array].r) *
        (obstacle.r + snake.body[end_of_array].r)
    ) {
      axisHit.x = distx;
    }
    if (distx <= obstacle.r * 1.5) {
      // radius size for snake
      axisHit.x = distx;
    }
    if (distx <= obstacle.r * 1.5 && obstacle.pos.z < 0) {
      axisHit.x = distx;
    }
    if (
      disty >
      (obstacle.r + snake.body[end_of_array].r) *
        (obstacle.r + snake.body[end_of_array].r)
    ) {
      axisHit.y = disty;
    }
    if (disty <= obstacle.r * 1.5) {
      // radius size for snake
      axisHit.y = disty;
    }
    if (disty <= obstacle.r * 1.5 && obstacle.pos.z < 0) {
      axisHit.y = disty;
    }
    if (
      dist >
      (obstacle.r + snake.body[end_of_array].r) *
        (obstacle.r + snake.body[end_of_array].r)
    ) {
      axisHit.totalDist = false;
    }
    if (dist <= obstacle.r * 1.5) {
      // radius size for snake
      axisHit.totalDist = true;
    }
    if (dist <= obstacle.r * 1.5 && obstacle.pos.z < 0) {
      axisHit.totalDist = false;
    }
    return axisHit;
  };

export const getPowerUp = (powerUps, value) => {
  var index = powerUps.indexOf(value);
  if (index > -1) {
    powerUps.splice(index, 1);
  }
  // for (let i = 0; i < powerUps.length; i++) {
  //   getPowerUp(powerUps, powerUps[i]);
  // }
}

export function getKey(p5, keys, value) {
  var index = keys.indexOf(value);
  if (index > -1) {
    keys.splice(index, 1);
  }
  var key = new Key(p5, p5.random(3, 97), p5.random(3, 97), 2);
  
  keys.push(key);
}