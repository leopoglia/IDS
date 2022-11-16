import "./style.css";
import ButtonTableList from "./ButtonSearch";
import Title from "./Title";
import { Link } from "react-router-dom";
import { SetStateAction, useState, useEffect } from "react";

export default function Search(props: any) {



    const [data, setData] = useState(false);


    const sendData = () => {

        if (data === true) {
            setData(false)
        } else {
            setData(true)
        }

        props.setTable(data);
    }




    return (
        <div className="search">
            <Title nav={props.nav} title={props.title} />

            <div className="section">

                <div className="input-search">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar por solicitação" required />
                </div>


                <div className="display-flex">
                    <Link to={props.link}>
                        <button className="btn-primary">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            {props.button}
                        </button>
                    </Link>


                    <div className="btn-search">
                        <ButtonTableList icon="table_rows" sendData={sendData} />

                        <ButtonTableList icon="filter_alt" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function sendData(data: any) {
    throw new Error("Function not implemented.");
}
