package com.arbaaz.MFAMS_backend.service;

import com.arbaaz.MFAMS_backend.exception.MutualFundException;
import com.arbaaz.MFAMS_backend.model.MutualFund;
import com.arbaaz.MFAMS_backend.repository.MutualFundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MutualFundService {

    private final MutualFundRepository mutualFundRepository;

    // admins only

    public ResponseEntity<?> createFund(MutualFund fund){

        fund.setLastUpdatedDate(LocalDate.now());
        mutualFundRepository.save(fund);
        return ResponseEntity.ok("Mutual fund added successfully");
    }

    public List<MutualFund> getAllMutualFunds(){
        return mutualFundRepository.findAll();
    }

    public ResponseEntity<MutualFund> getFundById(Long id){

        MutualFund mutualFund=mutualFundRepository.findById(id).orElseThrow(
                ()-> {
                    throw new MutualFundException("Mutual fund not found");
                }
        );
        return ResponseEntity.ok(
                mutualFund
        );

    }


    public ResponseEntity<?> updateFund( Long id,  MutualFund updatedFund) {


        MutualFund mutualFund=mutualFundRepository.findById(id).orElseThrow(
                ()-> new MutualFundException("Mutual fund not found")
        );

        updatedFund.setId(mutualFund.getId());
        updatedFund.setFundName(updatedFund.getFundName()==null ? mutualFund.getFundName() : updatedFund.getFundName());
        updatedFund.setFundCode(updatedFund.getFundCode()==null ? mutualFund.getFundCode() : updatedFund.getFundCode());
        updatedFund.setCategory(updatedFund.getCategory()==null ? mutualFund.getCategory() : updatedFund.getCategory());
        updatedFund.setNav(updatedFund.getNav()==null ? mutualFund.getNav() : updatedFund.getNav());
        updatedFund.setLastUpdatedDate(LocalDate.now());

        mutualFundRepository.save(updatedFund);

        return ResponseEntity.ok(
                mutualFund
        );



    }
    public ResponseEntity<String> deleteFund(long id) {

        MutualFund mutualFund=mutualFundRepository.findById(id).orElseThrow(
                ()-> new MutualFundException("Mutual fund not found")
        );

        mutualFundRepository.delete(mutualFund);
        return ResponseEntity.ok("Mutual fund deleted successfully");


    }
}
