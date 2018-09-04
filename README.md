Local Settings
==============

THIS EXTENSION WILL NOT WORK until
[this issue](https://github.com/Microsoft/vscode/issues/43226)
or a similar one is solved.

Local Settings is a VS Code extension to let you store settings to a machine in
a different file than the usual `settings.json`. This is useful when you sync
automatically your settings (e.g. with the *Settings Sync* extension) but have
settings specific to a machine that you do want to override locally (e.g.
`window.zoomLevel`).

Quick start:

1. Place your settings in a file named `localSettings.json`, next to
    `settings.json` in your user folder.
2. Open the command palette and start the "Local Settings: Load" command.



Features
--------

- Store local settings in a specific file and load them during start-up or with
    the `loadLocalSettings` command.



Extension Settings
------------------

This extension contributes the following settings:

- `localSettings.fileName`: change the name of the file to load, defaults to 
    `localSettings.json`.



TODO
----

- Watcher for the local settings file
- Ability to pick which level of configuration to shadow
- Ability to have several settings files
