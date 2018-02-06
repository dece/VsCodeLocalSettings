import * as fs from "fs";

import * as vscode from "vscode";

import * as commons from "./commons";
import LocalSettingsEnvironment from "./environment";

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

    /** Start watching the local settings file */
    public startWatcher = () => {

    }

    /** Load the local settings file and merge it to the user settings. */
    public applyLocalSettings = () => {
        const localSettingsPath = this.extensionConfig.get<string>("fileName");
        fs.readFile(localSettingsPath, (error, data) => {
            if (error)
                return;
            this.updateSettings(data);
        });
    }

    /** Dispose VS Code resources on deactivation. */
    public dispose = () => {}

    /**  */
    private updateSettings = (settings: object) => {
        for (const key in settings) {
            const config = vscode.workspace.getConfiguration(key);
            commons.showInfo(key + ' - ' + config + ' - ' + settings[key]);
        }
    }
}
