package com.arbaaz.MFAMS_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // BUY or SELL

    private Long userId;
    private Long mutualFundId;

    private BigDecimal units;
    private BigDecimal amount;

    private LocalDate transactionDate;
}
