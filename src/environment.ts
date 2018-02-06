/**
 * Environment module to compute only once valuable informations like user folder path.
 * 
 * Most of the code here is inspired by Shan Khan's Settings Sync extension.
 */

import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as vscode from "vscode";

import * as commons from "./commons";

export enum OperatingSystem { Linux, Windows, Osx, Other };

export default class LocalSettingsEnvironment {
    /** Extension context given upon activation. */
    public readonly context: vscode.ExtensionContext;
    /** True if using VS Code Insiders edition.  */
    public readonly isInsiders: boolean;
    /** Operating system. */
    public readonly os: OperatingSystem;
    /** User directory where settings.json and such files reside. */
    public readonly userDir: string;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.isInsiders = /insiders/.test(this.context.asAbsolutePath(""));
        this.os = this.getOperatingSystemType();
        this.userDir = this.getUserDir();
    }

    /** Check environment validity. The Extension should be deactivated on false. */
    public get isValid(): boolean {
        return Boolean(this.userDir);
    }

    private getOperatingSystemType = (): OperatingSystem => {
        switch (process.platform as string) {
            case "linux":
                return OperatingSystem.Linux;
            case "windows":
                return OperatingSystem.Windows;
            case "darwin":
                return OperatingSystem.Osx;
            default:
                return OperatingSystem.Other;
        }
    }
    
    private getUserDir = (): string => {
        let appHome;
        switch (this.os) {
            case OperatingSystem.Linux:
                appHome = path.join(os.homedir(), ".config");
                break;
            case OperatingSystem.Windows:
                appHome = process.env.APPDATA;
                break;
            case OperatingSystem.Osx:
                appHome = path.join(process.env.HOME, "Library/Application Support");
                break;
            case OperatingSystem.Other:
            default:
                appHome = "/var/local";
        }

        let codeDir;
        const possibleCodeDirNames = ["Code", "Code - Insiders", "Code - OSS"]
        const hasFoundCodeDir = possibleCodeDirNames.some(possibleName => (
            fs.existsSync(codeDir = path.join(appHome, possibleName))
        ));

        if (!hasFoundCodeDir) {
            commons.showError('Could not find VS Code directory.');
            return "";
        }
        
        commons.showInfo(path.join(codeDir, "User"));
        return path.join(codeDir, "User");
    }
}
