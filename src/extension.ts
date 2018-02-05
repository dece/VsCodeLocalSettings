'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Activating');

    let disposable = vscode.commands.registerCommand('localSettings.loadLocalSettings', () => {
        vscode.window.showInformationMessage('Loading local settings');
    });
    
    context.subscriptions.push(disposable);
}

export function deactivate() {
    vscode.window.showInformationMessage('Deactivating');
}
