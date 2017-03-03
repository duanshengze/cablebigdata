package com.uestc.cablebigdata.web;

import com.uestc.cablebigdata.service.InstantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2017/3/3.
 */
@Controller
@RequestMapping("/instant")
public class InstantController {
    private final Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private InstantService instantService;


}
