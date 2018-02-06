"use strict";

import * as vscode from "vscode";
import { Disposable } from "vscode";

import LocalSettingsManager from "./localSettings";

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage("Activating");

    // Register extension contributions.
    const disposables: Disposable[] = [];
    disposables.push(
        vscode.commands.registerCommand("localSettings.loadLocalSettings", () => {
            vscode.window.showInformationMessage("Loading local settings");
        })
    );
    
    context.subscriptions.push(...disposables);

    // Start the manager.

    // Notes
    // export enum ConfigurationTarget {
    //     Global = 1,
    //     Workspace = 2,
    //     WorkspaceFolder = 3
    // }
    // WorkspaceConfiguration (get, has, inspect, update)

    const manager = new LocalSettingsManager();
    manager.loadExtensionConfig();

    context.subscriptions.push(manager);
}

export function deactivate() {
    vscode.window.showInformationMessage("Deactivating");
}
