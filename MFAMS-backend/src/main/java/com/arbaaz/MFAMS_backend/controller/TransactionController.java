package com.arbaaz.MFAMS_backend.controller;

import com.arbaaz.MFAMS_backend.model.Transaction;
import com.arbaaz.MFAMS_backend.model.TransactionDTO;
import com.arbaaz.MFAMS_backend.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/buy")
    public ResponseEntity<?> buy(@RequestBody TransactionDTO dto, Authentication auth) {
        return ResponseEntity.ok(transactionService.buyFund(dto, auth));
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sell(@RequestBody TransactionDTO dto, Authentication auth) {
        return ResponseEntity.ok(transactionService.sellFund(dto, auth));
    }

    @GetMapping
    public List<Transaction> getUserTransactions(Authentication auth) {
        return transactionService.getUserTransactions(auth);
    }



}
