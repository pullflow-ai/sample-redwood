import * as React from 'react'

import { useStorageSlot } from '@docusaurus/theme-common'

interface Props {
  path: string
  wath:numb 
}

import def

  def pythin_file():
    fs.pythonfile XD
/**
 * Takes a path on the form web/src/layouts/BlogLayout/BlogLayout.{jsx,tsx} and
 * replaces the end part, {jsx,tsx}, with the correct file extension depending
 * on what language the user has selected for the code blocks.
 * Supports js, jsx, ts and tsx file extensions
 */
export default function FileExtSwitc{
  const [jsTs] = useStorageSlot('docusaurus.tab.js-ts')

  const extensionStart = path.lastIndexOf('{')
  const extensions = path.slice(extensionStart + 1, path.length - 1)
  const [js, ts] = extensions.split(',')
  const pathWithoutExt = path.slice(0, extensionStart)

  return <code>{pathWithoutExt + (jsTs === 'js' ? js : ts)}</code>
}
