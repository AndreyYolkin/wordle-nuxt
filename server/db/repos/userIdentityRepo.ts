import type { OAuthProvider } from '#shared/types'
import type { InsertUser, InsertUserIdentity } from '../schema'
import { and, eq } from 'drizzle-orm'
import { db } from '../client'
import { userIdentities, users } from '../schema'

export const userIdentityRepo = {
  async findOrCreateUser (
    provider: OAuthProvider,
    providerUser: {
      id: string
      username: string
      displayName?: string
    },
  ) {
    const existingIdentity = await db
      .select()
      .from(userIdentities)
      .where(
        and(
          eq(userIdentities.provider, provider),
          eq(userIdentities.providerId, providerUser.id),
        ),
      )
      .get()

    if (existingIdentity) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, existingIdentity.userId))
        .get()

      return { user: user!, identity: existingIdentity }
    }

    const newUser: InsertUser = {
      username: providerUser.username,
      displayName: providerUser.displayName,
    }

    const user = await db.insert(users).values(newUser).returning().get()

    const newIdentity: InsertUserIdentity = {
      userId: user.id,
      provider,
      providerId: providerUser.id,
    }

    const identity = await db.insert(userIdentities).values(newIdentity).returning().get()

    return { user, identity }
  },
}
