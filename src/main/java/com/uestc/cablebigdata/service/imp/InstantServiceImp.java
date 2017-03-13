package com.uestc.cablebigdata.service.imp;

import com.uestc.cablebigdata.entity.FirstInstantData;
import com.uestc.cablebigdata.entity.Machine;
import com.uestc.cablebigdata.model.InstMachineInfo;
import com.uestc.cablebigdata.service.InstantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/3/1.
 */
@Service
public class InstantServiceImp implements InstantService {
    public Map<String, Long> getDynamicContrastCount() {
        return null;
    }

    public Map<String, Long> getDynamicMachineCount(String contrast) {
        return null;
    }

    public Map<String, List<String>> getDynamicCompanyContrasts(String name) {
        return null;
    }

    public Map<String, List<String>> getDynamicProcessesMachines(String contrast) {
        return null;
    }

    public FirstInstantData getInsDataAndCpks(String machine) {
        return null;
    }

    public List<FirstInstantData> getFirstSeriersDataAndCpk(String machine) {
        return null;
    }

    public Map<Process, List<Machine>> getDynamicRefProcessAndMachines(String machine) {
        return null;
    }

    public Process getProcessByMachine(String machine) {
        return null;
    }

    public String getNowVolumeByMachine(String machine) {
        return null;
    }

    public String getMachinesAndStatus(String company) {
        return null;
    }

    public String getLastMeterTagByMachineNo(String machineNo) {
        return null;
    }

    public String getLastSparkValueByMachineNo(String machineNo) {
        return null;
    }

    public String getNowOperatorByMachine(String machine) {
        return null;
    }

    public String getNowMaterialByMachine(String machine) {
        return null;
    }

    public String getNowMeterByMachine(String machine) {
        return null;
    }

    public String getNowSparkByMachine(String machine) {
        return null;
    }

    public List<FirstInstantData> getAllSeriersDataAndCpk(String machine) {
        return null;
    }

    public List<String> getProcessListByCompany(String companyName) {
        return null;
    }

    public InstMachineInfo getMachineInfo(String companyName, String machinNO) {
        return null;
    }

    public List<String> getMachineList(String companyName, String processName) {
        return null;
    }
}
