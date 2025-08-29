#!/usr/bin/env node
import { Command } from "commander";
import random from 'random';

/** ---------- Commander setup ---------- */
const program = new Command();

const dice = ['2', '4', '6', '10', '12', '20', '100'];

program
  .name("Dice Roller")
  .description("A Dice Roller")
  .version("0.1.0")
  .option('-r, --roll <value>', 'Roll dice')
  .parse(process.argv);

const options = program.opts();

function output(diceString: string, rolls: number[], mod: number = 0) {
  const total = rolls.reduce((a, b) => a + b) + mod;

  console.log(`${diceString} => ${rolls.join('+')}${mod === 0 ? '' : ' +' + mod} => ${total}`);
}

function rollSingle(dieSize: number) {
  const diceString = `1d${dieSize}`;
  output(diceString, [random.int(1, dieSize)],)
}

function rollString(diceString: string) {
  const dIndex = diceString.indexOf('d');
  if (dIndex < 0) {
    console.log(`Invalid dice string: ${diceString}`);
    return;
  }
  const plusIndex = diceString.indexOf('+');

  const diceCount: number = Number.parseInt(diceString.substring(0, dIndex));
  const diceSize: number = Number.parseInt(diceString.substring(dIndex + 1, plusIndex < 0 ? diceString.length : plusIndex));
  const mod: number = plusIndex < 0 ? 0 : Number.parseInt(diceString.substring(plusIndex + 1));

  const rolls: number[] = [];
  for (let i = 0; i < diceCount; i++) {
    rolls.push(random.int(1, diceSize));
  }

  output(diceString, rolls, mod);
}

function roll(diceString: string) {
  if (dice.includes(diceString)) rollSingle(Number.parseInt(diceString));
  else rollString(diceString);
}

if (options.roll) {
  const diceString = typeof options.roll === 'string' ? options.roll : '';
  roll(diceString);
}
