const fs = require("fs");
const path = require("path");

import * as vscode from "vscode";

import commons from "./commons";
import LocalSettingsEnvironment from "./environment";
import { commands } from "vscode";

// Notes
// export enum ConfigurationTarget {
//     Global = 1,
//     Workspace = 2,
//     WorkspaceFolder = 3
// }
// WorkspaceConfiguration (get, has, inspect, update)

/**
 * Management of local settings: apply settings stored in a local settings file
 * to the current user settings.
 */
export default class LocalSettingsManager {
    /** Extension environment */
    private environment: LocalSettingsEnvironment;
    /** Configuration of the LocalSettings extension. */
    private extensionConfig: vscode.WorkspaceConfiguration;

    public constructor(environment: LocalSettingsEnvironment) {
        this.environment = environment;
        this.extensionConfig = vscode.workspace.getConfiguration("localSettings");
    }

    /** TODO Start watching the local settings file. */
    public startWatcher = () => {

    }

    /** Load the local settings file and merge it to the user settings. */
    public applyLocalSettings = () => {
        fs.readFile(this.localSettingsFilePath, 'utf8', (error, text) => {
            if (error) {
                commons.showException(error);
            }

            let data = null;
            try {
                data = JSON.parse(text);
            }
            catch (e) {
                commons.showException(e);
                return;
            }
            
            if (data !== null) {
                this.updateSettings(data);
            }
        });
    }

    /** Dispose VS Code resources on deactivation. */
    public dispose = () => {}

    /** Get a usable file path  */
    private get localSettingsFilePath(): string {
        let localSettingsPath = this.extensionConfig.get<string>("path");
        if (path.isAbsolute(localSettingsPath))
            return localSettingsPath;
        return path.join(this.environment.userDir, localSettingsPath);
    }

    /** Apply all configuration options contained in 'settings' to the user configuration. */
    private updateSettings = (settings: object) => {
        const config = vscode.workspace.getConfiguration();
        for (const key in settings) {
            try {
                config.update(key, settings[key]);
            }
            catch (e) {
                commons.showException(e);
            }
        }
    }
}
