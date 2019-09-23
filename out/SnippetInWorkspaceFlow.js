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
const path = require("path");
const vscode = require("vscode");
class SnippetInWorkspaceFlow {
    getWorkspaceSettingsRoot() {
        const rootPath = vscode.workspace.workspaceFolders;
        if (!rootPath || rootPath.length === 0) {
            throw new Error('Workspace root not found!');
        }
        return path.join(rootPath[0].uri.fsPath, '.vscode');
    }
    /*
 Infastructure for managind already created snippets, flow not yet finalized!

private createNewFileFlow(): Promise<string> {
    return new Promise(async (resolve, _) => {
        let newFileName = await vscode.window.showInputBox({ prompt: 'Enter Name of the New File' });

        if (!newFileName) {
            throw new Error('No file named inserted!');
        }
        
        newFileName += '.code-snippets';
        
        const fullPath = path.join(this.getWorkspaceSettingsRoot(), newFileName);

        if (!fs.existsSync(fullPath)) {
            fs.openSync(fullPath, "w+");
            fs.writeFileSync(fullPath, '{}');
        }

        resolve(fullPath);
    });
}

private getSnippetFiles(workspaceRoot: string) {
    const files = fs.readdirSync(workspaceRoot);

    const snippetFiles: string[] = [];

    files.forEach((file) => {
        const fileName = file;
        if (fileName.endsWith('.code-snippets')) {
            snippetFiles.push(fileName);
        }
    });

    resolve(snippetFiles);
}*/
    workspaceSpecificSelections(snippet) {
        return new Promise((resole, _) => __awaiter(this, void 0, void 0, function* () {
            const workspaceRoot = this.getWorkspaceSettingsRoot();
            const snippetFileName = snippet.prefix + '.code-snippets';
            const fullPath = path.join(workspaceRoot, snippetFileName);
            resole(fullPath);
            /*
            Infastructure for managind already created snippets, flow not yet finalized!
  
            const snippetFiles = this.getSnippetFiles(workspaceRoot);
      
             const chosenFile = await vscode.window.showQuickPick([
                  'Create New File',
                  ...snippetFiles
              ], {
                  canPickMany: false,
                  placeHolder: 'Where should the snippet be stored? (You can update an existing snippet or create a new one)'
              });
  
              if (chosenFile === 'Create New File') {
                  this.createNewFileFlow().then((fileName) => {
                      return path.join(workspaceRoot, fileName);
                  }).catch(() => {
                      throw new Error('No file named inserted!');
                  });
              } else if (chosenFile) {
                  return path.join(workspaceRoot, chosenFile);
              } else {
                  throw new Error('No option selected!');
              }*/
        }));
    }
}
exports.SnippetInWorkspaceFlow = SnippetInWorkspaceFlow;
//# sourceMappingURL=SnippetInWorkspaceFlow.js.map