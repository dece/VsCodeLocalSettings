import * as vscode from "vscode";

const messagePrefix = "Local Settings: ";

export const showInfo = (info: string) => {
    vscode.window.showInformationMessage(messagePrefix + info);
}

export const showError = (error: string) => {
    vscode.window.showErrorMessage(messagePrefix + error);
}

export const showException = (exception: Error) => {
    showError(`Exception (${exception.name}): ${exception.message}`);
}
