import "./style.css"
import Language from "../Language"

export default function Header() {
    return (
        <header className="header">

            <div className="left">
                <img src="../imgs/weg-white.png" alt="" />

                <div className="title">
                    <div className="flex">
                        <span className="material-symbols-outlined">
                            folder_copy
                        </span>
                        <span>Demandas</span>
                    </div>

                    <div className="trace" />
                </div>
            </div>

            <div className="right">
                <Language />

                <img className="person" src="" alt="" />
            </div>

        </header>

    )
}