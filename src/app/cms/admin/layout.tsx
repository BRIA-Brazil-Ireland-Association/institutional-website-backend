import type { ReactNode } from 'react'
import '@payloadcms/next/css'
import config from '@/payload.config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './importMap'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return RootLayout({
    children,
    config,
    importMap,
    serverFunction: handleServerFunctions,
  })
}
