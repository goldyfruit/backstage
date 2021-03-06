/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
  githubAuthApiRef,
} from '@backstage/core';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { catalogImportApiRef, CatalogImportClient } from './api';

export const rootRouteRef = createRouteRef({
  path: '',
  title: 'catalog-import',
});

export const catalogImportPlugin = createPlugin({
  id: 'catalog-import',
  apis: [
    createApiFactory({
      api: catalogImportApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        githubAuthApi: githubAuthApiRef,
        configApi: configApiRef,
        catalogApi: catalogApiRef,
      },
      factory: ({ discoveryApi, githubAuthApi, configApi, catalogApi }) =>
        new CatalogImportClient({
          discoveryApi,
          githubAuthApi,
          configApi,
          catalogApi,
        }),
    }),
  ],
  routes: {
    importPage: rootRouteRef,
  },
});

export const CatalogImportPage = catalogImportPlugin.provide(
  createRoutableExtension({
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);
