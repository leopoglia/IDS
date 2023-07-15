import { useEffect, useState, useContext } from 'react';
import UserContext from '../../../../context/userContext';


export default function Color(props: any) {

    const { worker, setWorker } = useContext(UserContext);
    const [color, setColor] = useState(props.color);
    const [colorSelected, setColorSelected] = useState(false);

    useEffect(() => {
        setColor(props.color);
    }, [props.color])


    const changeColor = (color: string) => {

        console.log(props.id)

        setColor(color);

        setWorker({
            ...worker,
            colors: {
                ...worker.colors,
                ["color" + props.id]: color
            }
        })

        switch (props.id) {
            case 1:
                document.documentElement.style.setProperty('--blue', color);
                break;
            case 2:
                document.documentElement.style.setProperty('--blue19', color);
                break;
            case 3:
                document.documentElement.style.setProperty('--blue00', color);
                break;
            case 4:
                document.documentElement.style.setProperty('--blue44', color);
                break;
            case 5:
                document.documentElement.style.setProperty('--blue64', color);
                break;
            case 6:
                document.documentElement.style.setProperty('--greyC4', color);
                break;
            case 7:
                document.documentElement.style.setProperty('--green', color);
                break;
            case 8:
                document.documentElement.style.setProperty('--red', color);
                break;
            case 9:
                document.documentElement.style.setProperty('--orange', color);
                break;
            case 10:
                document.documentElement.style.setProperty('--white2', color);
                break;
        }

    }


    return (
        <>
            <label htmlFor={'color-' + props.id} style={{ background: color }} className={"color color-" + props.id} onClick={() => setColorSelected(!colorSelected)}></label>
            <input type="color" id={"color-" + props.id} value={props.color} onChange={(e) => changeColor(e.target.value)} />
        </>
    )
}