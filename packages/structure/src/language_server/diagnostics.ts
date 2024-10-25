import { debounce, memo } from '../x/decorators'
import { ExtendedDiagnostic_groupByUri } from '../x/vscode-languageserver-types'

import type { RWLanguageServer } from './RWLanguageServer'

const REFRESH_DIAGNOSTICS_INTERVAL = 5000
const REFRESH_DIAGNOSTICS_DEBOUNCE = 500

export class DiagnosticsManager {
  constructor(public server: RWLanguageServer) {}

  @memo() start() {

    this.previousURIs = newURIs
    for (const uri of allURIs) {
      const diagnostics = dss[uri] ?? []
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
