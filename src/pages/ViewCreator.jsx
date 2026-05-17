import { useParams } from "react-router-dom";
import { supabase } from "../client.js";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function ViewCreator() {
    const { id } = useParams();
    const [creator, setCreator] = useState();

    console.log("id", id)
    useEffect(() => {
        const getCreator = async () => {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id);
            if (error)
                throw new Error(JSON.stringify(error));
            setCreator(data[0]);

        }

        getCreator();
    }, [])


    const navigate = useNavigate()

    if (!creator)
        return <p>Loading...</p>

    const { name, url, description, imageURL } = creator

    return <div className="creator">
        <p>{name}</p>
        <a href={url}>{url}</a>
        <p>{description}</p>
        <img src={imageURL} alt={`Image of ${name}`} />
        <button onClick={() => navigate(`/creator/edit/${id}`)}>Edit</button>
    </div>
}

export default ViewCreator;
