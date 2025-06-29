package com.arbaaz.MFAMS_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class MutualFund {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @Column(nullable = false)
    private String fundName;

    @Column(unique = false,nullable = true)
    private String fundCode;

    private String category;
    private BigDecimal nav;
    private LocalDate lastUpdatedDate;




}
