import React from 'react'

import { Redirect, useLocation } from '@docusaurus/router'

  const location = useLocation()
  const defaultUrl = [
    location.pathname.replace(/\/$/, ''),
    'docs',
    defaultDocsLandingPage,
  ].join('/')

  return <Redirect to={defaultUrl} />
}

export default Home
