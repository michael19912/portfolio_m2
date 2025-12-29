// ⬇️ MUST be first (before imports)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Admin token (fallback for local dev)
const ADMIN_TOKEN =
  process.env.ANALYTICS_ADMIN_TOKEN ||
  'portfolio-analytics-2025-secure-token';

export async function POST(request: NextRequest) {
  try {
    // Ensure environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request JSON safely
    let body: { eventType?: string; startDate?: string; endDate?: string };
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { eventType, startDate, endDate } = body;

    if (!eventType || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Event type, start date, and end date are required' },
        { status: 400 }
      );
    }

    // Convert dates safely
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(`${endDate}T23:59:59.999Z`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid start or end date' },
        { status: 400 }
      );
    }

    // Supabase bulk delete
    const { data, error } = await supabase
      .from('analytics_events')
      .delete()
      .eq('event_type', eventType)
      .gte('timestamp', startDateTime.toISOString())
      .lte('timestamp', endDateTime.toISOString())
      .select('id');

    if (error) {
      console.error('Supabase bulk delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete events' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedCount: data?.length ?? 0,
    });
  } catch (err) {
    console.error('Bulk delete analytics events error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
