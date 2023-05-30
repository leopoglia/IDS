import { Link } from "react-router-dom";
import "./style.css"

export default function ProgressBar(props: {
    atual: string;
}) {

    if (props.atual === "1") {
        return (
            <div className="progress-bar">
                <div className="ellipse-current">
                    <span className="material-symbols-outlined">
                        done
                    </span>
                </div>
                <div className="line"></div>
                <div className="ellipse">2</div>
                <div className="line"></div>
                <div className="ellipse">3</div>
            </div>
        );
    } else if (props.atual === "2") {
        return (
            <div className="progress-bar">
                <Link to={"/demand/create/1"}>
                    <div className="ellipse-current">
                        <span className="material-symbols-outlined">
                            done
                        </span>
                    </div>
                </Link>
                <div className="line-current"></div>
                <div className="ellipse-current">
                    <span className="material-symbols-outlined">
                        done
                    </span>
                </div>
                <div className="line"></div>
                <div className="ellipse">3</div>
            </div>
        );
    } else if (props.atual === "3") {
        return (
            <div className="progress-bar">
                <Link to={"/demand/create/1"}>
                    <div className="ellipse-current">
                        <span className="material-symbols-outlined">
                            done
                        </span>
                    </div>
                </Link>
                <div className="line-current"></div>

                <Link to={"/demand/create/2"}>
                    <div className="ellipse-current">
                        <span className="material-symbols-outlined">
                            done
                        </span>
                    </div>
                </Link>
                <div className="line-current"></div>
                <div className="ellipse-current">
                    <span className="material-symbols-outlined">
                        done
                    </span>
                </div>
            </div>
        );
    } else if (props.atual === "4") {
        return (
            <div className="progress-bar">
                <Link to={"/demand/create/1"}>
                    <div className="ellipse-current">
                        <span className="material-symbols-outlined">
                            done
                        </span>
                    </div>
                </Link>
                <div className="line-current"></div>
                <div className="ellipse-current">
                    <span className="material-symbols-outlined">
                        done
                    </span>
                </div>
                <div className="line"></div>
                <div className="ellipse">4</div>
            </div>
        );
    }


    return (
        <></>
    );
}