package net.weg.gedesti.model.entities;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

public class Classificacao {
    private Integer tamanhoClassificacao;
    private String BUsolicitante;
    private List<String> BusBeneficiadas = new ArrayList<String>();
    private String secaoTI;
    private Blob anexosClassificacao;
    private String codigoPPM;
    private String linkEpicJira;
}
