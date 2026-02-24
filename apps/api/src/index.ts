import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import { createClient } from '@supabase/supabase-js'

const fastify = Fastify({ logger: true })

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
})

fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
})

fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

async function verifyToken(authHeader: string | undefined) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header')
  }
  const token = authHeader.slice(7)
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) throw new Error('Invalid token')
  return user
}

fastify.get('/api/profile', {
  config: { rateLimit: { max: 60, timeWindow: '1 minute' } },
}, async (request, reply) => {
  try {
    const user = await verifyToken(request.headers.authorization)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (error) return reply.code(404).send({ error: 'Profile not found' })
    return { profile: data, email: user.email }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unauthorized'
    return reply.code(401).send({ error: message })
  }
})

fastify.put('/api/profile', {
  config: { rateLimit: { max: 30, timeWindow: '1 minute' } },
}, async (request, reply) => {
  try {
    const user = await verifyToken(request.headers.authorization)
    const { display_name, bio } = request.body as { display_name?: string; bio?: string }
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, display_name, bio, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (error) return reply.code(400).send({ error: error.message })
    return { profile: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unauthorized'
    return reply.code(401).send({ error: message })
  }
})

const port = parseInt(process.env.PORT || '3001', 10)
fastify.listen({ port, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
