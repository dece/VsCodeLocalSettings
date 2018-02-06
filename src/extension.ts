"use strict";

import * as vscode from "vscode";
import { Disposable } from "vscode";

import LocalSettingsEnvironment from "./environment";
import LocalSettingsManager from "./manager";

export function activate(context: vscode.ExtensionContext) {
    // Get informations on environment
    const extensionEnvironment = new LocalSettingsEnvironment(context);

    // Start the manager.
    const manager = new LocalSettingsManager(extensionEnvironment);
    context.subscriptions.push(manager);

    // Register extension contributions.
    const disposables: Disposable[] = [];
    disposables.push(
        vscode.commands.registerCommand(
            "localSettings.loadLocalSettings",
            manager.applyLocalSettings
        )
    );
    context.subscriptions.push(...disposables);
}

export function deactivate() { }
