import React, { useMemo } from 'react'

import { analyzeRoutes } from '../analyzeRoutes.js'
import { LocationProvider, useLocation } from '../location.js'
import { namedRoutes } from '../namedRoutes.js'
import type { RouterProps } from '../router.js'

import { renderRoutesFromDist } from './clientSsr.js'

export const Router = ({ paramTypes, children }: RouterProps) => {
  return (
    <LocationProvider>
      <LocationAwareRouter paramTypes={paramTypes}>
        {children}
      </LocationAwareRouter>
    </LocationProvider>
  )
}

const LocationAwareRouter = ({ paramTypes, children }: RouterProps) => {
  const { pathname } = useLocation()

  const { namedRoutesMap } = useMemo(() => {
    return analyzeRoutes(children, {
      currentPathName: pathname,
      userParamTypes: paramTypes,
    })
  }, [pathname, children, paramTypes])

  // Assign namedRoutes so it can be imported like import {routes} from 'rwjs/router'
  // Note that the value changes at runtime
  Object.assign(namedRoutes, namedRoutesMap)

  // @TODO(RSC): TS doesn't like that we're returning a promise, but in RSC it's ok!
  return renderRoutesFromDist(pathname) as unknown as React.ReactNode
}
