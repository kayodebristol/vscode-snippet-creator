const vscode = require('vscode');

const Snippet = require('./Snippet');
const SnippetsManager = require('./SnippetsManager');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.createSnippet', function () {

		let editor = vscode.window.activeTextEditor;
		let selection = editor.selection;
		var selectedText = editor.document.getText(selection);

		if(!editor || selection.isEmpty) {
			vscode.window.showWarningMessage('Cannot create snippet from empty string. Select some text first.'); 
			return;
		}

		var snippet = new Snippet();
		var snippetsManager = new SnippetsManager();

		vscode.languages.getLanguages()
			.then( vsCodeLangs => {
				return vscode.window.showQuickPick( vsCodeLangs, { placeHolder: vscode.window.activeTextEditor.document.languageId });
			})
			.then( language => {
				snippet.language = language;
				return vscode.window.showInputBox({ prompt: 'Enter snippet name'});
			})
			.then( name => {
				if(name === undefined) {
					return;
				}
				snippet.name = name;
				return vscode.window.showInputBox({ prompt: 'Enter snippet prefix' });
			})
			.then( prefix => {
				if (prefix === undefined) {
					return;
				}
				snippet.prefix = prefix;
				return vscode.window.showInputBox({ prompt: 'Enter snippet description' });
			})
			.then( description => {
				if (description === undefined) {
					return;
				}
				snippet.description = description;
			})
			.then( () => {
				snippet.body = selectedText;

				snippetsManager.addSnippet(snippet);
			});

	});

	context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
