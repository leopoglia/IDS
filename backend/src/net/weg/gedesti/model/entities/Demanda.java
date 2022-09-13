package net.weg.gedesti.model.entities;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

public class Demanda {
    private String tituloDemanda;
    private String problemaAtual;
    private String propostaDemanda;
    private List<ArrayList> centroDeCusto = new ArrayList<ArrayList>();
    private Blob anexosDemanda;
    private String statusDemanda;
    private String centroDeCustos;
    private Funcionario solicitante;
}
