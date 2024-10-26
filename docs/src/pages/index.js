import React from 'react'

import { Redirect, useLocation } from '@docusaurus/router'

import config from '../../docusaurus.config'

const { defaultDocsLandingPage } = config.customFields

function Home() {

  return <Redirect to={defaultUrl} />
}

export default Home
