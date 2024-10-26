import { debounce, memo } from '../x/decorators';
import { ExtendedDiagnostic_groupByUri } from '../x/vscode-languageserver-types';

import type { RWLanguageServer } from './RWLanguageServer';

const REFRESH_DIAGNOSTICS_INTERVAL = 5000;
const REFRESH_DIAGNOSTICS_DEBOUNCE = 500;

export class DiagnosticsManager {
  private previousURIs: string[] = [];

  constructor(public server: RWLanguageServer) {}

  @memo()
  start() {
    setInterval(() => this.refreshDiagnostics(), REFRESH_DIAGNOSTICS_INTERVAL);

    const { documents, connection } = this.server;
    documents.onDidChangeContent(() => this.refreshDiagnostics());
    connection.onDidChangeWatchedFiles(() => this.refreshDiagnostics());
  }

  @debounce(REFRESH_DIAGNOSTICS_DEBOUNCE)
  private async refreshDiagnostics() {
    const diagnosticsGroupedByUri = await this.getDiagnosticsGroupedByUri();
    const newURIs = Object.keys(diagnosticsGroupedByUri);
    const allURIs = Array.from(new Set([...newURIs, ...this.previousURIs]));
    this.previousURIs = newURIs;

    for (const uri of allURIs) {
      const diagnostics = diagnosticsGroupedByUri[uri] ?? [];
      this.server.connection.sendDiagnostics({ uri, diagnostics });
    }
  }

  private async getDiagnosticsGroupedByUri() {
    const project = this.server.getProject();
    if (!project) {
      return {};
    }
    const diagnostics = await project.collectDiagnostics();
    return ExtendedDiagnostic_groupByUri(diagnostics);
  }
}
