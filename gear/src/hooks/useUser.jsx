import { useEffect, useState } from "react";


export default () =>
{
    const [user, setUser] = useState({});

    useEffect(() => {
        const theUser = localStorage.getItem("user");
        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, [localStorage.getItem("user")])

    return { user }
}