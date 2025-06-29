package com.arbaaz.MFAMS_backend.service;

import com.arbaaz.MFAMS_backend.exception.TransactionException;
import com.arbaaz.MFAMS_backend.model.MutualFund;
import com.arbaaz.MFAMS_backend.model.Transaction;
import com.arbaaz.MFAMS_backend.model.TransactionDTO;
import com.arbaaz.MFAMS_backend.model.User;
import com.arbaaz.MFAMS_backend.repository.MutualFundRepository;
import com.arbaaz.MFAMS_backend.repository.TransactionRepository;
import com.arbaaz.MFAMS_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final MutualFundRepository mutualFundRepository;

    public ResponseEntity<?> buyFund(TransactionDTO dto, Authentication auth){
        User user= userRepository.findByUsername(auth.getName()).orElseThrow(
                ()-> new TransactionException("Some error occurred")
        );

        MutualFund fund=mutualFundRepository.findById(dto.getMutualFundId()).orElseThrow(
                ()-> new TransactionException("Some error occurred")
        );

        BigDecimal amount= fund.getNav().multiply(dto.getUnits());

        Transaction txn=new Transaction();
        txn.setType("BUY");
        txn.setUserId(user.getId());
        txn.setMutualFundId(fund.getId());
        txn.setUnits(dto.getUnits());
        txn.setAmount(amount);
        txn.setTransactionDate(LocalDate.now());

        transactionRepository.save(txn);

        return ResponseEntity.ok("Transaction successful");


    }

    public ResponseEntity<?> sellFund(TransactionDTO dto, Authentication auth){
        User user = getUserFromAuth(auth);

        MutualFund fund=mutualFundRepository.findById(dto.getMutualFundId()).orElseThrow(
                ()-> new TransactionException("Some error occurred")
        );

        BigDecimal amount= fund.getNav().multiply(dto.getUnits());

        Transaction txn=new Transaction();
        txn.setType("SELL");
        txn.setUserId(user.getId());
        txn.setMutualFundId(fund.getId());
        txn.setUnits(dto.getUnits());
        txn.setAmount(amount);
        txn.setTransactionDate(LocalDate.now());

        transactionRepository.save(txn);

        return ResponseEntity.ok("Transaction successful");


    }

    public List<Transaction> getUserTransactions(Authentication auth) {
        User user = getUserFromAuth(auth);
        return transactionRepository.findByUserId(user.getId());
    }

    private User getUserFromAuth(Authentication auth) {
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
