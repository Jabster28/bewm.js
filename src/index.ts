/* eslint-disable no-process-exit */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// import ascii from 'ascii-art';
import boxen from 'boxen';
import 'colors';
// @ts-ignore
import {select} from 'input';
import {exec} from 'child-process-promise';
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
            await exec('mv build/darwin.js build/main.js');
            console.log(boxen('Done!').green);
          } catch (error) {
            console.log(boxen('ERROR!!!').red);
            console.error(error);
          }
          console.log(
            "Now, run this in the project's root directory to compile your built JS file into an executable\n\nyarn pkg . --targets macos\n"
          );
          process.exit(0);
        });
        break;

      default:
        break;
    }
  });
})();
