package com.uestc.cablebigdata.web;

import com.uestc.cablebigdata.dto.HisWarnInfo;
import com.uestc.cablebigdata.service.HisWarnService;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/3/3.
 */
@Controller
@RequestMapping("/hiswarn")
public class HisWarnController {
    private final Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private HisWarnService hisWarnService;
    //分页查找
    @RequestMapping(value ="/{queryJson}/pageloaddata",method = RequestMethod.GET)
    public String pageLoadData(@PathVariable("queryJson") String queryJson, Model model){

        List<HisWarnInfo> pagesResult = hisWarnService.getHisTableResult(queryJson);

        model.addAttribute("pagesResult",pagesResult);

        return "hiswarn_newtable";
    }
    //导出文件信息
    @RequestMapping(value = "/download/{queryJson}/file" ,method = RequestMethod.GET)
    public String downloadfile(@PathVariable("queryJson")  String queryJson, Model model){
        File file=hisWarnService.getHisInfoFile(queryJson);
        model.addAttribute("file",file);
        return "file";
    }
    @RequestMapping(value = "/download/{queryJson}/chart" ,method = RequestMethod.GET)
    //查询显示预警数
    public String queryHisChart(@PathVariable("queryJson")  String queryJson,Model model){
       Map<String,String> chartMap=hisWarnService.getHisChartResult(queryJson);
       model.addAttribute("chartMap",chartMap);
        return "hischartsTable_newstyle";
    }
}
