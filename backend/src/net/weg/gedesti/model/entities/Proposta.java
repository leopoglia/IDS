package net.weg.gedesti.model.entities;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

public class Proposta {
    private String nomeProposta;
    private List<String> centroCustos = new ArrayList<String>();
    private Blob anexosProposta;
    private String statusProposta;
    private AnalistaDeTI AnalistaDeTI;
}
