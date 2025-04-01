import { getSupabaseClient } from '@/lib/supabase';
import { NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const user = JSON.stringify(data)
    return new Response(user, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}