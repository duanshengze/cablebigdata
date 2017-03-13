package com.uestc.cablebigdata.service;




import com.uestc.cablebigdata.entity.FirstInstantData;
import com.uestc.cablebigdata.entity.Machine;
import com.uestc.cablebigdata.model.InstMachineInfo;

import java.util.List;
import java.util.Map;

public interface InstantService {
	/**
	 * 获取当前正在工作订单对象和订单的数据条目的统计
	 * 线程休眠1秒读取数据，对比数据，数据条目发生变化的进行加载
	 * contrast_id  数据条目
	 * @return
	 */
	public Map<String, Long> getDynamicContrastCount();
	/**
	 * 根据订单获取机台对象和机台当前总的数据条目
	 * 线程休眠1秒读取数据，对比数据，数据条目发生变化的进行加载
	 * @param contrast
	 * @return
	 */
	public Map<String, Long> getDynamicMachineCount(String contrast);
	
	
	/**
	 * 获取正在工作的供应商名称和对应的订单号列表
	 * @return
	 */
	public Map<String, List<String>> getDynamicCompanyContrasts(String company);
	
	/**
	 * 获取正在工作的工序和工序设计的机台根据订单号,认为机台号唯一
	 * @return
	 */
	public Map<String, List<String>> getDynamicProcessesMachines(String contrast);
	
	/**
	 * 从获取的批量数据中获取最后一条
	 * 获取数据后首先和当前时间戳做对比若差值在一小时以上，则返回null
	 * 获取最后一条数据，并和上一次获取的数据进行对比，若时间戳更新，则数据返回，否则返回null
	 * 每个参数获得一条实时数据，若不产生数据返回null
	 * @param machine
	 * @return
	 */
	/*public HisWarnInfo getLastData(List<HisWarnInfo> refDatas);*/
	/**
	 * 每个参数计算一个cpk，若当前数据不存在则cpk=0
	 * @param machine
	 * @return
	 *//*
	public List<Double> calCpks(List<HisWarnInfo> refDatas);*/
	
	/**
	 * 计算cpk前首先判断是否获得的HisWarnInfo是否为null
	 * 获取一条实时数据和计算后的cpks
	 * @param machine
	 * @return
	 */
	public FirstInstantData getInsDataAndCpks(String machine);
	
	
	/**
	 * 查询数据库该机器号最后一个时间戳，根据此时间戳逆序取20条数据，顺序存入LinkedHashMap
	 * @param machine
	 * @return
	 */
	public List<FirstInstantData> getFirstSeriersDataAndCpk(String machine);
	/**
	 * 根据当前生产的机台查找同批次盘号的其他正在生产的工序名称和机台号码
	 * @param machine
	 * @return
	 */
	public Map<Process, List<Machine>> getDynamicRefProcessAndMachines(String machine);
	
	/**
	 * 根据机台号获取该机台所在工序
	 * @param machine
	 * @return
	 */
	public Process getProcessByMachine(String machine);
	/**
	 * 根据机台查询当前正在生产盘号
	 * 查询时间戳，从当前机器最后一条数据中获取盘号
	 * @return
	 */
	public String getNowVolumeByMachine(String machine);
	/**
	 * 根据公司名称，分工序获取该公司所有机台和所有机台的运行状态，判断该公司机台是否正常
	 * @param company
	 * @return
	 */
	public String getMachinesAndStatus(String company);
	
	/**
	 * 获取某固定机台最新米标
	 * @param machineNo
	 * @return
	 */
	public String getLastMeterTagByMachineNo(String machineNo);
	
	/**
	 * 获取某固定机台最新火花值
	 * @param machineNo
	 * @return
	 */
	public String getLastSparkValueByMachineNo(String machineNo);
	public String getNowOperatorByMachine(String machine);
	public String getNowMaterialByMachine(String machine);
	public String getNowMeterByMachine(String machine);
	public String getNowSparkByMachine(String machine);
	/**获得所有的固定机台的增量数据
	 * @param machine
	 * @return
	 */
	public List<FirstInstantData> getAllSeriersDataAndCpk(String machine);


    List<String> getProcessListByCompany(String companyName);

	InstMachineInfo getMachineInfo(String companyName, String machinNO);

	List<String> getMachineList(String companyName, String processName);
}
