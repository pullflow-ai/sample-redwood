import * as React from 'react'

iblank space after opening the tag e.g.
 *
 * @example
 * <ShowForTs>
 * // {blank space}
 * ### Mdx Formatted content
 * </ShowForTs>
 * **/

export default function ShowForTs({ children }: Props) {
  const [jsTs] = useStorageSlot('docusaurus.tab.js-ts')

  return jsTs === 'ts' && <MDXContent>{children}</MDXContent>
}
