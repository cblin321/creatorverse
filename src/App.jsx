import { useRoutes } from 'react-router-dom'
import './App.css'
import ShowCreators from "./pages/ShowCreators.jsx"
import ViewCreator from "./pages/ViewCreator.jsx"
import EditCreator from "./pages/EditCreator.jsx"
import AddCreator from "./pages/AddCreator.jsx"
import { supabase } from "./client.js"
import { useState, useEffect } from "react"

function App() {
    console.log("app load")
    const [creators, setCreators] = useState()
    useEffect(() => {
        const getCreators = async () => {
            const { data, err } = await supabase.from('creators').select()
            if (err)
                throw new Error(err)

            setCreators(data)
        }

        getCreators()
    }, [])
    console.log(creators)
    const element = useRoutes([
        {
            path: '/',
            element: <ShowCreators creators={creators} />,
        },
        {
            path: '/creator/view/:id',
            element: <ViewCreator />
        },
        {
            path: '/creator/edit/:id',
            element: <EditCreator />
        },
        {
            path: '/creator/add',
            element: <AddCreator />
        }
    ]);

    return element;

}

export default App;
