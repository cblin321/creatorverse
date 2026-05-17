import { useNavigate } from "react-router-dom"
function Card({ id, name, url, description, imageURL }) {
    const navigate = useNavigate()
    return <div className="creator"
        onClick={() => navigate(`/creator/view/${id}`)}
    >
        <p>{name}</p>
        <a href={url}>{url}</a>
        <p>{description}</p>
        <img src={imageURL} alt={`Image of ${name}`} />
        <button onClick={(e) => {
            e.stopPropagation();
            navigate(`/creator/edit/${id}`);
        }}>Edit</button>
        <button onClick={(e) => {
            e.stopPropagation();
            navigate(`/creator/view/${id}`)
        }
        }>View</button>
    </div>
}

export default Card;
