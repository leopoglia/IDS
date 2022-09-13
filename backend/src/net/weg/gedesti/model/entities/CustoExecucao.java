package net.weg.gedesti.model.entities;

import java.util.ArrayList;
import java.util.List;

public class CustoExecucao {
    private String tipoDespesa;
    private String perfilDespesa;
    private String periodoExecucao;
    private Integer horasNecessarias;
    private String prazoExecucao;
    private Double valorHora;
    private List<String> centroDeCustos = new ArrayList<String>();

}
