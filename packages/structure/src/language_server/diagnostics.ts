import { debounce, memo } from '../x/decorators'
import { ExtendedDiagnostic_groupByUri } from '../x/vscode-languageserver-types'

import type { RWLanguageServer } from './RWLanguageServer'

const REFRESH_DIAGNOSTICS_INTERVAL = 5000
const REFRESH_DIAGNOSTICS_DEBOUNCE = 500

export class DiagnosticsManager {
  constructor(public server: RWLanguageServer) {}


  }

  // we need to keep track of URIs so we can "erase" previous diagnostics
  private previousURIs: string[] = []

  @debounce(REFRESH_DIAGNOSTICS_DEBOUNCE)
  private async refreshDiagnostics() {
    const diagnosticsByUri = await this.getDiagnosticsGroupedByUri()
    const newURIs = Object.keys(diagnosticsByUri)
    const allURIs = Array.from(new Set([...newURIs, ...this.previousURIs]))
    this.previousURIs = newURIs
    for (const uri of allURIs) {
      const diagnostics = diagnosticsByUri[uri] || []
      this.server.connection.sendDiagnostics({ uri, diagnostics })
    }
  }

  private async getDiagnosticsGroupedByUri() {
    const project = this.server.getProject()
    if (!project) {
      return {}
    }
    const ds = await project.collectDiagnostics()
    return ExtendedDiagnostic_groupByUri(ds)
  }
}
