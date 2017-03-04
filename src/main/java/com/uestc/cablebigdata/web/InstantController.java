package com.uestc.cablebigdata.web;

import com.uestc.cablebigdata.service.InstantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/3/3.
 */
@Controller
@RequestMapping("/instant")
public class InstantController {
    private final Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private InstantService instantService;
    //读取所选择的生产厂商的机台和机台状态
    @RequestMapping(value ="/{companyname}/machines/status",method = RequestMethod.GET)
    public void loadMachinesAndStatus(@PathVariable("companyname")String companyname, Model model){
        String machines_status=instantService.getMachinesAndStatus(companyname);
        model.addAttribute("machines_status",machines_status);
    }

    @RequestMapping(value = "/{companyname}/show",method = RequestMethod.GET)
    public String loadCompanyContrast(@PathVariable("companyname")String companyname,
                                      Model model){
        Map<String, List<String>> selectData = instantService.getDynamicCompanyContrasts(companyname);
    }
}
