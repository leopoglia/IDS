const presentationUtil = {

    steps: (): any => {
        const type = window.location.href.split("/")[3];

        if (type === "demands") {
            return [
                {
                    element: '.input-search',
                    title: "Campo de busca",
                    intro: 'No campo de busca você consegue buscar pelo nome da demanda.',
                    position: 'left'
                },
                {
                    element: '.btn-create-demand',
                    title: "Criar demanda",
                    intro: 'Para criar uma nova demanda você deve clicar em criar demanda.',
                    position: 'left'
                },
                {
                    element: '.table_rows',
                    title: "Alterar visualização",
                    intro: 'Para alterar o estilo de visualização das demandas.',
                    position: 'left'
                },
                {
                    element: '.filter_alt',
                    title: "Filtrar",
                    intro: 'Para filtrar uma demanda por uma ou mais informações especificas.',
                    position: 'left'
                },
                {
                    element: '.demand-0',
                    title: "Card",
                    intro: 'No card você consegue visualizar as informações da demanda.',
                    position: 'left'
                },
                {
                    element: '.demand-0 .situation-demand',
                    title: "Situação da demanda",
                    intro: 'Aqui você pode visualizar a situação da demanda, podendo clicar para ver cada passo dela.',
                    position: 'left'
                },
                {
                    element: '.none',
                    title: "",
                    intro: '',
                    position: ''
                }
            ];
        } 
    },
    onExit: (worker: any, setWorker: any): any => {
        worker.presentation = false;
        setWorker(worker);
    },

    complete: (e: any, navigate: any): any => {
        const type = window.location.href.split("/")[3];

        if (type === "demands") {
            if (e === 6) {
                navigate("/demand/workflow/1");
                localStorage.setItem("presentantion", "true");
            }
        } 
    }
}


export default presentationUtil;