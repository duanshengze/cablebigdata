package com.uestc.cablebigdata.model.view;

/**
 * Created by Administrator on 2017/3/5.
 */
public class InstMQuery {
    private String companyName;
    private String processName;
    private String machineNo;

    public InstMQuery(String companyName) {
        this.companyName = companyName;
    }

    public InstMQuery(String companyName, String processName) {
        this.companyName = companyName;
        this.processName = processName;
    }

    public InstMQuery(String companyName, String processName, String machineNo) {
        this.companyName = companyName;
        this.processName = processName;
        this.machineNo = machineNo;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getMachineNo() {
        return machineNo;
    }

    public void setMachineNo(String machineNo) {
        this.machineNo = machineNo;
    }
}
