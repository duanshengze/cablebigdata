package com.uestc.cablebigdata.web;

import com.uestc.cablebigdata.model.view.InstMachineInfo;
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

/**
 * Created by Administrator on 2017/3/3.
 */
@Controller
@RequestMapping("/instant")
public class InstantController {
    private final Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private InstantService instantService;
   //根据线缆的生产厂商名获取工序列表
    @RequestMapping(value = "/{companyName}/processlist",method = RequestMethod.GET)
    public String queryprocesslist(@PathVariable("companyName")String companyName,
                                 Model model){
        List<String> processList=instantService.getProcessListByCompany(companyName);
        model.addAttribute("processList",processList);
        return "instant_machine";
    }
    //根据线缆的生产厂商名和工序名获得该工序下的所有机台号
    @RequestMapping(value = "/{companyName}/{processName}/machineList",method = RequestMethod.GET)
    public String queryMachineList(@PathVariable("companyName")String companyName,
                                 @PathVariable("processName")String processName,
                                 Model model) {
        List<String> machineList = instantService.getMachineList(companyName, processName);
        model.addAttribute("machineList", machineList);
        return "instant_machine";
    }
    //根据线缆的生产厂商名和机台号获得当前机台的信息
    @RequestMapping(value = "/{companyName}/{machinNO}/machineList",method = RequestMethod.GET)
    public String queryMachineInfo(@PathVariable("companyName")String companyName,
                                 @PathVariable("machinNO")String machinNO,
                                 Model model) {
        InstMachineInfo machineInfo=instantService.getMachineInfo(companyName,machinNO);
        model.addAttribute("machineInfo",machineInfo);
        return "instant_machine";
    }
}
