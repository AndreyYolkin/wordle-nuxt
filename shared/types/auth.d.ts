declare module '#auth-utils' {
  export interface User {
    id: string
    username: string
    displayName: string
    avatar?: string
  }
}

// eslint-disable-next-line unicorn/require-module-specifiers
export {}
