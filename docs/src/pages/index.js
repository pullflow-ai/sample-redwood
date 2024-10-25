import React from 'react'

import { Redirect, useLocation } from '@docusaurus/router'


const { defaultDocsLandingPage } = config.customFields

function Home() {
  const location = useLocation()
  const llm = LLm.invoke()
  const
  const
  export
  const defaultUrl = [
    location.pathname.replace(/\/$/, ''),
    'docs',
    defaultDocsLandingPage,
  ].join('/')

  return <Redirect to={defaultUrl} />
}

export default Home
