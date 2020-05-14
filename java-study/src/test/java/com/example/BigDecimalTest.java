package com.example;

import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;

public class BigDecimalTest {

    private Logger logger = LoggerFactory.getLogger(BigDecimalTest.class);

    @Test
    public void equal(){
        BigDecimal dec1 = new BigDecimal(12);
        BigDecimal dec2 = BigDecimal.valueOf(12.000);
        logger.info("dec1: {}, dec2: {}", dec1.floatValue(), dec2.floatValue());
        Assert.assertTrue(dec1.floatValue() == 12);
    }
}
