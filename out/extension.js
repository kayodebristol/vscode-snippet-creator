"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const Snippet_1 = require("./Snippet");
const SnippetsManager_1 = require("./SnippetsManager");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createSnippet', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const editor = vscode.window.activeTextEditor;
            if (editor === undefined) {
                return;
            }
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            var snippet = new Snippet_1.default();
            var snippetsManager = new SnippetsManager_1.default();
            if (selection.isEmpty) {
                vscode.window.showWarningMessage('Cannot create snippet from empty string. Select some text first.');
                return;
            }
            snippet.language = editor.document.languageId;
            const name = yield vscode.window.showInputBox({ prompt: 'Enter snippet name' });
            if (name === undefined) {
                return;
            }
            snippet.name = name;
            const prefix = yield vscode.window.showInputBox({ prompt: 'Enter snippet prefix' });
            if (prefix === undefined) {
                return;
            }
            snippet.prefix = prefix;
            const description = yield vscode.window.showInputBox({ prompt: 'Enter snippet description' });
            if (description === undefined) {
                return;
            }
            snippet.description = description;
            snippet.buildBody(selectedText);
            snippetsManager.addSnippet(snippet);
        }
        catch (_a) {
            vscode.window.showErrorMessage("An unknown error appear");
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map