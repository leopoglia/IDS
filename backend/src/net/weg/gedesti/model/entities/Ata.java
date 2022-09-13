package net.weg.gedesti.model.entities;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

public class Ata {
    private String nomeAta;
    private String problemaAta;
    private List<String> centroCustos = new ArrayList<String>();
    private Blob anexos;
}
