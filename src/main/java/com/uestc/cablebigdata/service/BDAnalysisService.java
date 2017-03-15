package com.uestc.cablebigdata.service;

import com.uestc.cablebigdata.model.view.AprioriResult;
import com.uestc.cablebigdata.model.view.BDAnysisResult;
import com.uestc.cablebigdata.model.view.CraftBound;
import com.uestc.cablebigdata.model.view.ProcessMaterial;

import java.util.Date;

/**
 * Created by Administrator on 2017/3/3.
 */

public interface BDAnalysisService {

    BDAnysisResult<ProcessMaterial> getMaterialByProcess(String processName, Date date);

    BDAnysisResult<CraftBound> getCraftBound(String processName, Date date);

    BDAnysisResult<AprioriResult> startBigAnysis(String processName, Date date);
}
