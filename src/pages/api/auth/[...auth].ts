import * as jose from 'jose'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

type StoredUser = {
  username: string
  salt: string
  hash: string
}

const users: StoredUser[] = []

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(password, salt, 64) as Buffer
  return { salt, hash: derived.toString('hex') }
}

function verifyPassword(password: string, salt: string, hash: string) {
  const derived = scryptSync(password, salt, 64) as Buffer
  const hashBuf = Buffer.from(hash, 'hex')
  if (hashBuf.length !== derived.length) return false
  return timingSafeEqual(hashBuf, derived)
}

async function signToken(username: string) {
  const jwtSecret = "ENVTESTJWTSECRET_126a6c8a854b8d50f9e7a8"
  if (!jwtSecret) {
    console.error('JWT_SECRET not set')
    throw new Error('server misconfiguration')
  }

  const alg = 'HS256'
  const secretKey = new TextEncoder().encode(jwtSecret)

  return new jose.SignJWT({ sub: username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('lincms')
    .setAudience('lincms-users')
    .setExpirationTime('2h')
    .sign(secretKey)
}

export default async function handler(req: any, res: any) {
  // Determine action from last path segment or fallback to query
  const type = (req.url && req.url.split('/').pop()) || req.query?.type

  if (!type) return res.status(400).json({ error: 'missing action type' })
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' })

  switch (type) {
    case 'create': {
      const { username, password } = req.body || {}
      if (!username || !password) return res.status(400).json({ error: 'username and password required' })
      if (users.some(u => u.username === username)) return res.status(409).json({ error: 'username already exists' })

      const { salt, hash } = hashPassword(password)
      users.push({ username, salt, hash })

      try {
        const token = await signToken(username)
        res.setHeader('Set-Cookie', `auth=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200`)
        return res.status(201).json({ success: true })
      } catch (err) {
        console.error('failed to sign token', err)
        return res.status(500).json({ error: 'token creation failed' })
      }
    }

    case 'login': {
      const { username, password } = req.body || {}
      if (!username || !password) return res.status(400).json({ error: 'username and password required' })

      const user = users.find(u => u.username === username)
      if (!user) return res.status(401).json({ error: 'invalid credentials' })

      const ok = verifyPassword(password, user.salt, user.hash)
      if (!ok) return res.status(401).json({ error: 'invalid credentials' })

      try {
        const token = await signToken(username)
        res.setHeader('Set-Cookie', `auth=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200`)
        return res.status(200).json({ success: true })
      } catch (err) {
        console.error('failed to sign token', err)
        return res.status(500).json({ error: 'token creation failed' })
      }
    }

    case 'validate': {
      // Get token from httpOnly cookie
      const token = req.cookies?.auth

      if (!token) return res.status(400).json({ error: 'token required' })

      const result = await verifyToken(token)
      if (result.valid) return res.status(200).json({ valid: true, payload: result.payload })
      return res.status(401).json({ valid: false, reason: result.reason || 'invalid token' })
    }


    default:
      return res.status(404).json({ error: 'unknown action' })
  }
}

async function verifyToken(token: string) {
  const jwtSecret = "ENVTESTJWTSECRET_126a6c8a854b8d50f9e7a8"
  if (!jwtSecret) {
    console.error('JWT_SECRET not set')
    throw new Error('server misconfiguration')
  }

  const secretKey = new TextEncoder().encode(jwtSecret)

  try {
    const verified = await jose.jwtVerify(token, secretKey, {
      issuer: 'lincms',
      audience: 'lincms-users',
    })
    return { valid: true, payload: verified.payload }
  } catch (err: any) {
    return { valid: false, reason: err?.message || String(err) }
  }
}