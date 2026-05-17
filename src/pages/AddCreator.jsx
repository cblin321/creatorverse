import { useRef } from 'react';
import { supabase } from '../client.js';
import { useNavigate } from 'react-router-dom';
function AddCreator() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('creators').insert({
            name: name.current.value,
            url: url.current.value,
            description: description.current.value,
            imageURL: imageURL.current.value
        })

        if (error)
            throw new Error(JSON.stringify(error))

        navigate('/');

    }
    const name = useRef()
    const url = useRef()
    const description = useRef()
    const imageURL = useRef()

    return <form onSubmit={handleSubmit} class="creator-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={name} required />

        <label htmlFor="url">URL</label>
        <input type="url" id="url" ref={url} required />

        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" ref={description} required />

        <label htmlFor="imageURL">Image URL</label>
        <input type="url" id="imageURL" ref={imageURL} />

        <button type="submit">Add Creator</button>
    </form>
}

export default AddCreator;
