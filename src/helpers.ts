/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import figlet from 'figlet-promised';
import 'colors';
import {resolve} from 'path';
import {rejects} from 'assert';

export const ascii = (h: string, color?: string): Promise<string> => {
  return new Promise((resolve, _reject) => {
    let x = '';
    // @ts-ignore
    figlet(h).then(data => {
      console.log(data);
      x = data || '';
    });
    if (color) {
      const lines = x.split('\n');
      // @ts-ignore
      lines.forEach(e => (e = e[color]));
      x = lines.join('\n');
    }
    resolve(x);
  });
};
export const windowClear = () => {
  console.clear();
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
