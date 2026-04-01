const { default: EmbedClient } = require("../components/EmbedClient");
const { getSession } = require("../lib/getSession");

export default async function page()
{
    const session = await getSession();
    return(
        <>
            <EmbedClient ownerId={session?.user?.id} />
        </>
    )
}

