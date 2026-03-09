import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers"

export interface ScalekitProfile extends Record<string, any> {
  sub: string
  email: string
  email_verified: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  oid: string // organization_id
}

export default function Scalekit<P extends ScalekitProfile>(
  options: OAuthUserConfig<P> & {
    issuer: string
    organizationId?: string
    connectionId?: string
    domain?: string
  }
): OAuthConfig<P> {
  const { issuer, organizationId, connectionId, domain } = options

  return {
    id: "scalekit",
    name: "Scalekit",
    type: "oidc",
    issuer,
    authorization: {
      params: {
        scope: "openid email profile",
        ...(connectionId && { connection_id: connectionId }),
        ...(organizationId && { organization_id: organizationId }),
        ...(domain && { domain }),
      },
    },
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name ?? `${profile.given_name} ${profile.family_name}`,
        email: profile.email,
        image: profile.picture ?? null,
      }
    },
    style: { bg: "#6f42c1", text: "#fff" },
    options,
  }
}
