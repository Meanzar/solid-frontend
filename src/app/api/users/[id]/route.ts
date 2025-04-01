import { getSupabaseClient } from '@/lib/supabase';
import { Params } from '@/lib/type';
import { NextRequest} from 'next/server';

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const userId = params.id
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('users').select('*').eq('id', userId)
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