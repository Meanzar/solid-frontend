import { getSupabaseClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'
import { faker } from '@faker-js/faker'

export async function GET(request: NextRequest) {
    const supabase = getSupabaseClient();
    const {data, error} = await supabase
        .from('users')
        .select('*');
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
export async function POST(request: NextRequest) {
    const supabase = getSupabaseClient();
    
    try {
        const body = await request.json(); 
        const { email, password } = body;

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError || !authData?.user) {
            return new Response(JSON.stringify({ error: authError?.message || "Unknown error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }


        const token = authData?.session?.access_token;
        const randomName = faker.person.fullName();
        const randomJob = faker.person.jobType();
        const {error} = await supabase.from('users').insert(
            { name: randomName, job: randomJob, year: 30}
        );

        return new Response(JSON.stringify({user: authData, token}), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error in POST /register:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
