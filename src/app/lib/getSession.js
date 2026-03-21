import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession()
{
    const session = await cookies();
    const token = session.get("access token")?.value;       //Getting the token from cookies
    if(!token)
    {
        return null;
    }
    try {
        const result = await scalekit.validateToken(token);     //Validating the token 
        console.log("result is ",result);
        const user = await scalekit.user.getUser(result.sub);
        // console.log("user is ",user);
        return user;
    } catch (error) {
        console.log(error);
    }
}