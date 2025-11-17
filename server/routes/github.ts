import { userIdentityRepo } from '../db/repos/userIdentityRepo'

export default defineOAuthGitHubEventHandler({
  async onSuccess (event, { user }) {
    const { user: dbUser } = await userIdentityRepo.findOrCreateUser('github', {
      id: String(user.id),
      username: user.login,
      displayName: user.name || user.login,
    })

    await setUserSession(event, {
      user: {
        id: String(dbUser.id),
        username: dbUser.username,
        displayName: dbUser.displayName,
        avatar: user.avatar_url,
      },
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/')
  },
})
