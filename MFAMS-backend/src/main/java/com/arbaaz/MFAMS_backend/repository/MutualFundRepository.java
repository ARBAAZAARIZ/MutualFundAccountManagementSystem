package com.arbaaz.MFAMS_backend.repository;

import com.arbaaz.MFAMS_backend.model.MutualFund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MutualFundRepository extends JpaRepository<MutualFund,Long> {

    Optional<MutualFund> findByFundCode(String fundCode);
}
