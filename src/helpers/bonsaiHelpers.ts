import { ShootType } from "../types/bonsai";

export const rows = 24;
export const cols = 55;
export const lives = 100;
export const timeToStep = 100;
let maxShoots = 1;
let shootCooldown = 50;

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

// x goes up and down (-1 is up)
// y goes left to right
const chooseNextCell = (
  shootType: ShootType,
  life: number,
  age: number
): [number, number] => {
  let dx = 0;
  let dy = 0;

  switch (shootType) {
    case ShootType.trunk: {
      const multiplier = 5;
      if (age <= 4) {
        dx = 0;
        const dice = random(0, 2);
        if (dice === 0) {
          dy = -1;
        } else {
          dice === 1 ? (dy = 0) : (dy = 1);
        }
      }
      // young trunk should grow wide
      else if (age < multiplier * 30) {
        if (age % multiplier === 0) dx = -1;
        else dx = 0;

        const dice = random(0, 10);
        if (dice >= 0 && dice <= 0) dy = -2;
        else if (dice >= 1 && dice <= 3) dy = -1;
        else if (dice >= 4 && dice <= 5) dy = 0;
        else if (dice >= 6 && dice <= 8) dy = 1;
        else if (dice >= 9 && dice <= 9) dy = 2;
      }
      // middle-aged trunk
      else {
        let dice = random(0, 10);
        if (dice >= 7) dx = -1;
        else dx = 0;

        dice = random(0, 10);
        if (dice <= 2) dy = -1;
        else if (dice > 2 && dice < 8) dy = 0;
        else if (dice >= 8) dy = 1;
      }
      break;
    }
    case ShootType.shootLeft: {
      // favour going to the left and not growing tall
      // very small chance for the shoot to go down or to the right

      let rand = random(0, 9);
      if (rand < 2) dx = -1;
      else if (rand >= 2 && rand <= 7) dx = 0;
      else if (rand > 7) dx = 1;
      // dx = 0;

      rand = random(0, 9);
      if (rand >= 0 && rand <= 1) dy = -2;
      else if (rand >= 2 && rand <= 5) dy = -1;
      else if (rand >= 6 && rand <= 8) dy = 0;
      else if (rand >= 9) dy = 1;

      break;
    }
    case ShootType.shootRight: {
      let rand = random(0, 9);
      if (rand >= 0 && rand <= 1) dx = -1;
      else if (rand >= 2 && rand <= 7) dx = 0;
      else if (rand >= 8 && rand <= 9) dx = 1;

      rand = random(0, 9);
      if (rand >= 0 && rand <= 1) dy = 2;
      else if (rand >= 2 && rand <= 5) dy = 1;
      else if (rand >= 6 && rand <= 8) dy = 0;
      else if (rand >= 9 && rand <= 9) dy = -1;
      break;
    }
    case ShootType.dying: {
      // if this tree is about to die, we need to bloom out
      let rand = random(0, 10);
      if (rand >= 0 && rand <= 1) dx = -1;
      else if (rand >= 2 && rand <= 8) dx = 0;
      else if (rand >= 9 && rand <= 9) dx = 1;

      rand = random(0, 15);
      if (rand >= 0 && rand <= 0) dy = -3;
      else if (rand >= 1 && rand <= 2) dy = -2;
      else if (rand >= 3 && rand <= 5) dy = -1;
      else if (rand >= 6 && rand <= 8) dy = 0;
      else if (rand >= 9 && rand <= 11) dy = 1;
      else if (rand >= 12 && rand <= 13) dy = 2;
      else if (rand >= 14 && rand <= 14) dy = 3;

      break;
    }
    case ShootType.dead: {
      // dead tree needs to bloom
      dy = random(0, 3) - 1;

      let rand = random(0, 10);
      if (rand >= 0 && rand <= 1) dx = -1;
      else if (rand >= 2 && rand <= 6) dx = 0;
      else if (rand >= 6 && rand <= 10) dx = 1;

      rand = random(0, 10);
      if (rand >= 0 && rand <= 2) dy = -1;
      else if (rand >= 3 && rand <= 6) dy = 0;
      else if (rand >= 7 && rand <= 9) dy = 1;

      break;
    }
    default:
      dx = random(0, 10) > 3 ? -1 : 0;
      dy = random(-3, 3);
  }

  return [dx, dy];
};

export const chooseNextChar = (
  dx: number,
  dy: number,
  shootType: ShootType
): string => {
  let char = "???";

  switch (shootType) {
    case ShootType.trunk:
      if (dx === 0) char = '<span">/~</span>';
      else if (dy < 0) char = '<span">\\|</span>';
      else if (dy === 0) char = '<span">/|\\</span>';
      else if (dy > 0) char = '<span">/|</span>';
      break;
    case ShootType.shootLeft:
      if (dx > 0) char = '<span>\\</span>';
      else if (dx === 0) char = '<span">\\~</span>';
      else if (dy < 0) char = '<span>\\|</span>';
      else if (dy === 0) char = '<span">/|</span>';
      else if (dy > 0) char = '<span>/</span>';
      break;
    case ShootType.shootRight:
      if (dx > 0) char = '<span>/</span>';
      else if (dx === 0) char = '<span">~/</span>';
      else if (dy < 0) char = '<span>\\|</span>';
      else if (dy === 0) char = '<span">/|</span>';
      else if (dy > 0) char = '<span>/</span>';
      break;
    case ShootType.dying:
      char = '<span style="color: #6fc458">&</span>';
      break;
    case ShootType.dead:
      char = '<span style="color: #25a003">&</span>';
      break;
    default:
      char = "???";
  }

  return char;
};

export const getBonsaiBase = (trunkColor?: string, baseColor?: string): string => {
  let base = "";

  base += `:${'<code style="color: #25a003">_</code>'.repeat(
    2
  )}<code style="color: ${trunkColor}">./~~~~~\\.</code>${'<code style="color: #25a003">_</code>'.repeat(
    2
  )}:\n`;
  base += `<code style="color: ${baseColor}">\\${"\u00A0".repeat(12)}/\n</code>`;
  base += `<code style="color: ${baseColor}">\u00A0\\${"_".repeat(10)}/\n</code>`;
  base += `<code style="color: ${baseColor}">\u00A0\u00A0(_)${"\u00A0".repeat(4)}(_)</code>`;
  return base;
};

export const grow = (
  row: number,
  col: number,
  life: number,
  age: number,
  shootType: ShootType,
  tempBonsai: string[][],
  setBonsai: React.Dispatch<React.SetStateAction<string[][]>>
): void => {
  if (life < 1) {
    return;
  }
  age += 1;
  life -= 1;

  const cells = chooseNextCell(shootType, life, age);
  const dx = cells[0];
  const dy = cells[1];
  row += dx;
  col += dy;

  if (row <= 0 || row > rows - 1 || col <= 0 || col > cols - 1) {
    return;
  }

  const char = chooseNextChar(dx, dy, shootType);
  const newBonsaiGrid = [...tempBonsai];
  newBonsaiGrid[row][col] = char;

  shootCooldown += 1;
// 200 was the old lives, so I halved all values
  if (life < 15) {
    window.setTimeout(() => {
      grow(row, col, life, age, ShootType.dead, tempBonsai, setBonsai);
    }, timeToStep);
  } else if (life < 35) {
    window.setTimeout(() => {
      grow(row, col, life, age, ShootType.dying, tempBonsai, setBonsai);
    }, timeToStep);
  } else {
    if (age === 20) {
      maxShoots -= 1;
      grow(row, col, 50, age, ShootType.shootRight, newBonsaiGrid, setBonsai);
    } else if (age === 45) {
      grow(row, col, 50, age, ShootType.shootLeft, newBonsaiGrid, setBonsai);
    } else if (age === 70) {
      grow(row, col, 50, age, ShootType.shootRight, newBonsaiGrid, setBonsai);
    }

    window.setTimeout(() => {
      grow(row, col, life, age, shootType, newBonsaiGrid, setBonsai);
    }, timeToStep);
  }

  setBonsai(newBonsaiGrid);
};

export default chooseNextCell;
