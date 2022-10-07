import "./style.css"

export default function ProgressBar(props) {




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
}