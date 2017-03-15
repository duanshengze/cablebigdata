package com.uestc.cablebigdata.web;

import com.uestc.cablebigdata.model.view.AprioriResult;
import com.uestc.cablebigdata.model.view.BDAnysisResult;
import com.uestc.cablebigdata.model.view.CraftBound;
import com.uestc.cablebigdata.model.view.ProcessMaterial;
import com.uestc.cablebigdata.service.BDAnalysisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;

/**
 * Created by Administrator on 2017/3/3.
 */
@Controller
@RequestMapping("/bdanlysis")
public class BDAnalysisController {
    private final Logger logger= LoggerFactory.getLogger(this.getClass());
    @Autowired
    private BDAnalysisService bdAnalysisService;
    //获取一定时间段的挤绝缘工序的所有批次的所有的材料类型
    @RequestMapping(value ="/{processName}/{date}/querymaterials",method = RequestMethod.GET)
    public BDAnysisResult<ProcessMaterial> queryMaterialsOnProcess
                                    (@PathVariable("processName")String processName,
                                     @PathVariable("date")Date date
                                    ,Model model){
        BDAnysisResult<ProcessMaterial>result= bdAnalysisService.getMaterialByProcess(processName,date);
        return  result;
    }
    //获取挤绝缘工序中判断该工序的工艺指数的上下限
    @RequestMapping(value ="/{processName}/{date}/querymaterials",method = RequestMethod.GET)
    public BDAnysisResult<CraftBound> queryCraftBound
                                        (@PathVariable("processName")String processName,
                                         @PathVariable("date")Date date
            ,Model model){
        BDAnysisResult<CraftBound>result= bdAnalysisService.getCraftBound(processName,date);
        return  result;
    }
    //根据挤绝缘工序的所用的材料类型，开启对该工序的参数关联的分析，并返回相关结果
    public BDAnysisResult<AprioriResult> exeBigAnysis
            (@PathVariable("processName")String processName,
             @PathVariable("date")Date date
                    ,Model model){
        BDAnysisResult<AprioriResult>result= bdAnalysisService.startBigAnysis(processName,date);
        return  result;
    }
}
