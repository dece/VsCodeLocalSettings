import * as vscode from "vscode";

export default class LocalSettingsManager {
    private extensionConfig: vscode.WorkspaceConfiguration | null;

    public constructor() {
        this.extensionConfig = null;
    }

    public loadExtensionConfig = () => {
        this.extensionConfig = vscode.workspace.getConfiguration("localSettings");
        vscode.window.showInformationMessage(this.extensionConfig.get("fileName"));
    }

    public dispose = () => {}
}
