import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../../../../../context/userContext";
import Mic from "../../../../../Fixed/Accessibility/Mic";
import Label from "../Label/label";
import "./style.css"
import IntlCurrencyInput from "react-intl-currency-input"


export default function Input(props) {


    const worker = useContext(UserContext).worker;

    const [outlined, setOutlined] = useState(false);
    const [voiceCommand, setVoiceCommand] = useState(false);
    const [currencyConfig, setCurrencyConfig] = useState({
        locale: "pt-BR",
        formats: {
            number: {
                BRL: {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    });

    useEffect(() => {
        setVoiceCommand(worker.voiceCommand);
    }, [worker])

    useEffect(() => {

        if (props?.currency === "$") {
            setCurrencyConfig({
                locale: "en-US",
                formats: {
                    number: {
                        BRL: {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        },
                    },
                },
            })
        } else if (props?.currency === "€") {
            setCurrencyConfig({
                locale: "en-US",
                formats: {
                    number: {
                        BRL: {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        },
                    },
                },
            })

        } else {
            setCurrencyConfig({
                locale: "pt-BR",
                formats: {
                    number: {
                        BRL: {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        },
                    },
                },
            })
        }

    }, [props.currency])


    const onChange = (e) => {

        if (props?.handle !== undefined) {
            props?.handle(e.target.value, props.label);
        } else {
            if (props.setValue !== undefined) {
                props.setValue(e.target.value);
            }
        }

    }

    const handleChange = (event, value, maskedValue) => {
        props.setValue(maskedValue)
    };

    return (
        <div className="display-block w100 input-background">
            {props.label !== undefined ?
                <Label title={props.label} required="true" textInfo="Digite o centro de custo que ira pagar" />
                : null
            }


            <div className={"input " + props.background + " outlined-" + outlined + " icon-" + (props.icon !== undefined ? "true" : "false")} onClick={() => setOutlined(true)} onMouseOut={() => setOutlined(false)}>
                <span className="material-symbols-outlined">{props.icon}</span>

                {props.type !== "number" ?
                    <input value={props.value} type={props.type} placeholder={props.placeholder} onChange={onChange} required={props.required} ref={props.ref} disabled={props.disabled} />
                    :
                    <IntlCurrencyInput
                        currency="BRL"
                        value={props.value}
                        config={currencyConfig}
                        onChange={handleChange}
                    />
                }

                {
                    voiceCommand === true && props.type !== "date" && props.type !== "datetime-local" && props?.disabled !== true ?
                        <div className="mic">
                            <Mic setValue={props.setValue} value={props.value} handle={props.handle} label={props.label} />
                        </div>
                        : null
                }
            </div>
        </div>
    );
}