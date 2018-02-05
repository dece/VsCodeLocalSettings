'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Activating');

    let disposable = vscode.commands.registerCommand('localSettings.loadLocalSettings', () => {
        vscode.window.showInformationMessage('Loading local settings');

        // Notes
        // export enum ConfigurationTarget {
        //     Global = 1,
        //     Workspace = 2,
        //     WorkspaceFolder = 3
        // }
        // WorkspaceConfiguration (get, has, inspect, update)
    });
    
    context.subscriptions.push(disposable);
}

export function deactivate() {
    vscode.window.showInformationMessage('Deactivating');
}
