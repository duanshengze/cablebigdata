package com.uestc.cablebigdata.service.imp;

import com.uestc.cablebigdata.model.view.HisWarnInfo;
import com.uestc.cablebigdata.service.HisWarnService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Map;
/**
 * Created by Administrator on 2017/3/1.
 */
@Service
public class HisWarnServiceImp  implements HisWarnService{
    public List<HisWarnInfo> getAllCompanys() {
        return null;
    }

    public List<HisWarnInfo> getContrastsByCompany(String Company_ID) {
        return null;
    }

    public List<HisWarnInfo> getCompanyContrastByVolume(String volume) {
        return null;
    }

    public List<HisWarnInfo> getAllByMeterAndDate(String meter, String date) {
        return null;
    }

    public List<HisWarnInfo> getHisTableResult(String queryJson) {
        return null;
    }

    public Map<String, Object> getAllWarnCount(String paramDate, String paramDateEnd) {
        return null;
    }

    public Map<String, Object> getVolumeWarnCountByVolume(String volume, String paramDate, String paramDateEnd) {
        return null;
    }

    public Map<String, Object> getContrastWarnCountByCompany(String company, String paramDate, String paramDateEnd) {
        return null;
    }

    public Map<String, Object> getVolumeWarnCountByMeterDate(String meter, String date) {
        return null;
    }

    public Map<String, Object> getProcessesByContrast(String contrast, String paramDate, String paramDateEnd) {
        return null;
    }

    public Map<String, Object> getMeterWarnCountByVolumeAndMeter(String volume, String meter, String paramDate, String paramDateEnd) {
        return null;
    }

    public File getHisInfoFile(String queryInfo) {
        return null;
    }

    public Map<String, String> getHisChartResult(String queryJson) {
        return null;
    }

}
