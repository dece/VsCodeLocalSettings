import * as vscode from "vscode";

const messagePrefix = "Local Settings: ";

namespace commons {

const showInfo = (info: string) => {
    vscode.window.showInformationMessage(messagePrefix + info);
}

const showError = (error: string) => {
    vscode.window.showErrorMessage(messagePrefix + error);
}

const showException = (exception: Error) => {
    showError(`Exception (${exception.name}): ${exception.message}`);
}

}  // namespace commons

export default commons;
