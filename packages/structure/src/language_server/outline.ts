import { getOutline } from '../outline/outline'
import { memo } from '../x/decorators'
import {
  RemoteTreeDataProviderImpl,
  RemoteTreeDataProvider_publishOverLSPConnection,
} from '../x/vscode'

import type { RWLanguageServer } from './RWLanguageServer'
\
            return [{ label: 'No Redwood.js project found...' }]
          },
        }
      }
      return getOutline(p)
    }
    const tdp = new RemoteTreeDataProviderImpl(getRoot)
    const methodPrefix = 'redwoodjs/x-outline-'
    RemoteTreeDataProvider_publishOverLSPConnection(
      tdp,
      this.server.connection,
      methodPrefix,
    )
  }
}
