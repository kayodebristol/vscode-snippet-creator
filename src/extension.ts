import * as vscode from 'vscode';

import Snippet from "./Snippet";
import SnippetsManager from "./SnippetsManager";
import { SnippetInWorkspaceFlow } from './SnippetInWorkspaceFlow';

export function activate (context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.createSnippet', async () => {

		try {
			const editor = vscode.window.activeTextEditor;
			if (editor === undefined) { return; }

			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);

			var snippet = new Snippet();
			var snippetsManager = new SnippetsManager();

			if (selection.isEmpty) {
				vscode.window.showWarningMessage('Cannot create snippet from empty string. Select some text first.');
				return;
			}

			snippet.language = editor.document.languageId;

			const name = await vscode.window.showInputBox({ prompt: 'Enter snippet name' });
			if (name === undefined) { return; }
			snippet.name = name;

			const prefix = await vscode.window.showInputBox({ prompt: 'Enter snippet prefix' });
			if (prefix === undefined) { return; }
			snippet.prefix = prefix;

			const description = await vscode.window.showInputBox({ prompt: 'Enter snippet description' });
			if (description === undefined) { return; }
			snippet.description = description;

			snippet.buildBody(selectedText);

			const _createInWorkspace = await vscode.window.showQuickPick(['Yes', 'No'], {
				canPickMany: false,
				placeHolder: 'Store snippet in this workspace?'
			});
			if (_createInWorkspace === undefined) { return; }

			const createInWorkspace = _createInWorkspace === 'Yes' ? true : false;

			if (!createInWorkspace) {
				snippetsManager.addSnippet(snippet);
			} else {
				const wsFlow = new SnippetInWorkspaceFlow();

				const filePath = await wsFlow.workspaceSpecificSelections(snippet);

				snippetsManager.addSnippetByPath(snippet, filePath);
			}
		}
		catch{
			vscode.window.showErrorMessage("An unknown error appear");
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate () { }
