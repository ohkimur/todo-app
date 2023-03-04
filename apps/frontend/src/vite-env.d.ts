/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASEPATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
