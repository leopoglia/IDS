import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../../../context/userContext";
import Mic from "../../../../../Fixed/Accessibility/Mic";
import Label from "../Label/label";
import "./style.css"

export default function Input(props: any) {


    const worker: any = useContext(UserContext).worker;


    let [outlined, setOutlined]: any = useState(false);
    const [voiceCommand, setVoiceCommand] = useState(false);

    useEffect(() => {
        setVoiceCommand(worker.voiceCommand);
    }, [worker])

    const onChange = (e: any) => {

        if (props?.handle !== undefined) {
            props?.handle(e, props.label);
        } else {
            if (props.setValue !== undefined) {
                props.setValue(e.target.value);
            }
        }
    }

    return (
        <div className="display-block w100 input-background">
            {props.label !== undefined ?
                <Label title={props.label} required="true" textInfo="Digite o centro de custo que ira pagar" />
                : null
            }


            <div className={"input " + props.background + " outlined-" + outlined + " icon-" + (props.icon !== undefined ? "true" : "false")} onClick={() => setOutlined(true)} onMouseOut={() => setOutlined(false)}>
                <span className="material-symbols-outlined">{props.icon}</span>
                <input value={props.value} type={props.type} placeholder={props.placeholder} onChange={onChange} required={props.required} ref={props.ref} disabled={props.disabled}  />

                {worker.voiceCommand}

                {voiceCommand === true && props.type !== "date" && props.type !== "datetime-local"  && props?.disabled !== true  ?
                    <Mic setValue={props.setValue} value={props.value} handle={props.handle} label={props.label} />
                    : null}
            </div>
        </div>
    );
}