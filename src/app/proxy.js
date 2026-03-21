import { getSession } from "./lib/getSession";

export async function proxy(request)
{
    const session = await getSession();
    console.log(session);
}