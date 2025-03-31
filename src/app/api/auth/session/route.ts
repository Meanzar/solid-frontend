import { getSupabaseClient } from "@/lib/supabase";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const supabase = getSupabaseClient();
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return new Response(JSON.stringify({ error: 'Authorization token is missing' }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { data: session, error } = await supabase.auth.getUser(token);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify(session), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

}