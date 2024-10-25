import { getOutline } from '../outline/outline';
import { memo } from '../x/decorators';
import {
  RemoteTreeDataProviderImpl,
  RemoteTreeDataProvider_publishOverLSPConnection,
} from '../x/vscode';

import type { RWLanguageServer } from './RWLanguageServer';

export class OutlineManager {
  constructor(public server: RWLanguageServer) {}

  @memo()
  start() {
    const getRoot = () => {
      const project = this.server.getProject();
      if (!project) {
        return {
          async children() {
            return [{ label: 'No Redwood.js project found...' }];
          },
        };
      }
      return getOutline(project);
    };

    const treeDataProvider = new RemoteTreeDataProviderImpl(getRoot);
    const methodPrefix = 'redwoodjs/x-outline-';
    RemoteTreeDataProvider_publishOverLSPConnection(
      treeDataProvider,
      this.server.connection,
      methodPrefix,
    );
  }
}
