package com.arbaaz.MFAMS_backend.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionDTO {

    private Long mutualFundId;
    private BigDecimal units;
}
