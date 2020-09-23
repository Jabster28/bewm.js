# Generating Payloads

::: warning
Right now, only MacOS payloads are able to be geneated. Sorry!
:::

Generating payloads is generally the same, no matter what platform.

After the splashscreen, you select `Make a backdoor` and the platform you want to target, like so:

```
? So, what's tickling your fancy today? Make a backdoor
? What architecture do you want to target? darwin
```

This will compile your TS sourcecode files into JavaScript, ready to be combined into a binary with `pkg`.

The program will tell you which command to run to generate whatever you asked for, it should look something like this:

```bash
yarn pkg . --targets macos # example for macos
```

Once that's done, you should have a binary called `bewm ` in your project directory. Congratulations! Now you need to find a way to get that file on your target's computer, and this sadly won't be able to help you with that. It's a backdoor _creater_, you're the one in charge of finding a way to get your target to execute the file.

After that's done, we can move over to running the payloads.