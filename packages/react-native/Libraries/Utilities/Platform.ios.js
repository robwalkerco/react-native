/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 */

import NativePlatformConstantsIOS from './NativePlatformConstantsIOS';

export type PlatformSelectSpec<T> = {
  default?: T,
  native?: T,
  ios?: T,
  ...
};

const Platform = {
  __constants: null,
  OS: 'ios',
  // $FlowFixMe[unsafe-getters-setters]
  get Version(): string {
    // $FlowFixMe[object-this-reference]
    return this.constants.osVersion;
  },
  // $FlowFixMe[unsafe-getters-setters]
  get constants(): {|
    forceTouchAvailable: boolean,
    interfaceIdiom: string,
    isTesting: boolean,
    osVersion: string,
    reactNativeVersion: {|
      major: number,
      minor: number,
      patch: number,
      prerelease: ?number,
    |},
    systemName: string,
  |} {
    // $FlowFixMe[object-this-reference]
    if (this.__constants == null) {
      // $FlowFixMe[object-this-reference]
      this.__constants = NativePlatformConstantsIOS.getConstants();
    }
    // $FlowFixMe[object-this-reference]
    return this.__constants;
  },
  // $FlowFixMe[unsafe-getters-setters]
  get isPad(): boolean {
    // $FlowFixMe[object-this-reference]
    return this.constants.interfaceIdiom === 'pad';
  },
  // $FlowFixMe[unsafe-getters-setters]
  get isTV(): boolean {
    // $FlowFixMe[object-this-reference]
    return this.constants.interfaceIdiom === 'tv';
  },
  // $FlowFixMe[unsafe-getters-setters]
  get isTesting(): boolean {
    // $FlowFixMe[object-this-reference]
    return this.constants.isTesting;
  },
  select: <T>(spec: PlatformSelectSpec<T>): T =>
    // $FlowFixMe[incompatible-return]
    'ios' in spec ? spec.ios : 'native' in spec ? spec.native : spec.default,
};

module.exports = Platform;
