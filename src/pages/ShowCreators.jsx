import Card from "../components/Card.jsx"
import { useNavigate } from "react-router-dom"
import { supabase } from "../client.js"
import { useState, useEffect } from "react"
function ShowCreators() {
    const [creators, setCreators] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const getCreators = async () => {
            const { data, err } = await supabase.from('creators').select()
            if (err)
                throw new Error(err)

            setCreators(data)
        }

        getCreators()
    }, [])

    if (!creators)
        return <p>Loading...</p>

    const creatorCards = creators.map(creator => {
        return <Card {...creator} />
    })

    return <div className="creator-container">
        <button onClick={() => navigate('/creator/add')}>Add a creator</button>
        {creatorCards}
    </div >
}

export default ShowCreators;
