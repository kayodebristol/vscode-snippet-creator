"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createSnippet', () => {
        var editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            return;
        }
        var selection = editor.selection;
        var selectedText = editor.document.getText(selection);
        if (selection.isEmpty) {
            vscode.window.showWarningMessage('Cannot create snippet from empty string. Select some text first.');
            return;
        }
        vscode.languages.getLanguages()
            .then(vsCodeLangs => {
            var testtest = vsCodeLangs;
            //return vscode.window.showQuickPick(testtest, { placeholder: editor.document.languageId });
        });
        vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map