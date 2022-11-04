import "./style.css"

export default function ButtonAction(props: {
    title: string
    click: string
}) {

    function redirectPage(click: string): void {

        if (window.location.pathname === "/create-demand/1") {
            if (click === "voltar") {

                window.location.href = "/demands";
                console.log(window.location.href)

            } else if (click === "avancar") {
                window.location.href = "/create-demand/2";
            }
        } else if (window.location.pathname === "/create-demand/2") {
            if (click === "voltar") {
                window.location.href = "/create-demand/1";
            } else if (click === "avancar") {
                window.location.href = "/create-demand/3";
            }
        } else if (window.location.pathname === "/create-demand/3") {
            if (click === "voltar") {
                window.location.href = "/create-demand/2";
            } else if (click === "avancar") {
                window.location.href = "/create-demand/4";
            }
        }
    }

    if (props.click === "voltar") {

        return (
            <button className="button-action-back" onClick={() => { redirectPage(props.click) }}>
                {props.title}
            </button>
        );
    } else {
        return (
            <button className="button-action-next" onClick={() => { redirectPage(props.click) }}>
                {props.title}
            </button>
        );
    }
}