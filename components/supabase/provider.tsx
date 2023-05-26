'use client'

import type { Session } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useState } from 'react'
import type { TypedSupabaseClient } from '@/app/layout'
import { createBrowserClient } from '@/libs/supabase/browser'

type MaybeSession = Session | null

interface SupabaseContext {
  supabase: TypedSupabaseClient
  session: MaybeSession
}

// @ts-expect-error disable args error
const Context = createContext<SupabaseContext>()

export default function SupabaseProvider ({ children, session }: { children: React.ReactNode, session: MaybeSession }): JSX.Element {
  const [supabase] = useState(() => createBrowserClient())

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = (): SupabaseContext => useContext(Context)
