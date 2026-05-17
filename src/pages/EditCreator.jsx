import { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import { useParams, useNavigate } from 'react-router-dom';
function EditCreator() {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleDelete = async () => {
        const { data, error } = await supabase.from('creators').delete().eq('id', id);

        if (error)
            throw new Error(JSON.stringify(error));
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, url, description, imageURL } = creator;
        const { data, error } = await supabase.from('creators').update({
            name,
            url,
            description,
            imageURL: imageURL
        }).eq('id', id);

        if (error)
            throw new Error(JSON.stringify(error))

        navigate('/');
    }
    const [creator, setCreator] = useState()

    useEffect(() => {
        const getCreator = async () => {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id)

            if (error)
                throw new Error(JSON.stringify(error))

            setCreator(data[0])
        }

        getCreator()
    }, [])


    const setCreatorField = (field, value) => {
        setCreator(oldCreator => ({
            ...oldCreator,
            [field]: value
        }))
    }
    return <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={creator?.name ?? ""} onChange={(e) => setCreatorField("name", e.target.value)} required />

        < label htmlFor="url">URL</label>
        <input type="url" id="url" value={creator?.url ?? ""} onChange={(e) => setCreatorField("url", e.target.value)} required />

        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" value={creator?.description ?? ""} onChange={(e) => setCreatorField("description", e.target.value)} required />

        <label htmlFor="imageURL">Image URL</label>
        <input type="url" id="imageURL" value={creator?.imageURL ?? ""} onChange={(e) => setCreatorField("imageURL", e.target.value)} />

        <button type="submit">Edit Creator</button>
        <button type="button" onClick={handleDelete}>Delete Creator</button>
    </form>
}

export default EditCreator;
