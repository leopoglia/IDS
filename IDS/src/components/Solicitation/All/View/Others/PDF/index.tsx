import "./style.css"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useEffect } from "react";

export default function PDF(props: any) {

    useEffect(() => { 
        generatePDF();
    }, [props]);

    const generatePDF = async () => {
        const input:any = document.getElementById('pdf');

        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        pdf.addImage(imgData, 'PNG', 0, 0, 130, 160);
        pdf.save('document.pdf');
    };


    return (
        <div className="background-pdf">

            <div id="pdf" className="pdf">
                <div className="headerPDF">
                    <img src="/images/weg-blue.png" alt="" />
                </div>

                <p>{props.demandTitle} - {props.demandCode}</p>

                <span>Solicitante: {props.requester}</span>

            </div>

        </div>
    );
}