import Home from "../components/Home.jsx";
import { getSession } from "../lib/getSession.js";

async function ChatAiApp()
{
    const userSession = await getSession();
    // console.log("user Session is ", userSession);
    return (
        <>
            <Home email={userSession?.user?.email} />
        </>
    );
}

export default ChatAiApp;