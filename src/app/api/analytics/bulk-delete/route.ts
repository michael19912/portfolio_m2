import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const ADMIN_TOKEN =
  process.env.ANALYTICS_ADMIN_TOKEN ||
  'portfolio-analytics-2025-secure-token'

export async function POST(request: NextRequest) {
  try {
    // ✅ Create Supabase client at REQUEST TIME
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // ✅ Auth check
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ Parse body (safe with POST)
    const { eventType, startDate, endDate } = await request.json()

    if (!eventType || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Event type, start date, and end date are required' },
        { status: 400 }
      )
    }

    const startDateTime = new Date(startDate).toISOString()
    const endDateTime = new Date(`${endDate}T23:59:59.999Z`).toISOString()

    const { data, error } = await supabase
      .from('analytics_events')
      .delete()
      .eq('event_type', eventType)
      .gte('timestamp', startDateTime)
      .lte('timestamp', endDateTime)
      .select('id')

    if (error) {
      console.error('Supabase bulk delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete events' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      deletedCount: data?.length ?? 0,
    })
  } catch (error) {
    console.error('Bulk delete analytics events error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
