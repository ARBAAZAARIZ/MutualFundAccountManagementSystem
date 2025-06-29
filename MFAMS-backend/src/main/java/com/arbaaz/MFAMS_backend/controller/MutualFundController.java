package com.arbaaz.MFAMS_backend.controller;

import com.arbaaz.MFAMS_backend.model.MutualFund;
import com.arbaaz.MFAMS_backend.service.MutualFundService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/funds")
@CrossOrigin("*")
public class MutualFundController {

    private final MutualFundService mutualFundService;

    @PostMapping
    public ResponseEntity<?> createFund( @RequestBody MutualFund fund){
       return mutualFundService.createFund(fund);
    }

    @GetMapping
    public List<MutualFund> getAllMutualFunds(){
        return mutualFundService.getAllMutualFunds();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MutualFund> getFundById(@PathVariable Long id){
        return mutualFundService.getFundById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFund( @PathVariable Long id, @RequestBody  MutualFund updatedFund){
        return mutualFundService.updateFund(id,updatedFund);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteFund(@PathVariable long id){
        return mutualFundService.deleteFund(id);
    }

}
