package com.uestc.cablebigdata.serversocket;

import org.mortbay.util.ajax.JSON;

import java.io.File;
import java.net.Socket;

/**
 * Created by Administrator on 2017/3/12.
 */
public interface SocketService {
    //检测机台是否在产生新线缆
    public void startIsWorkNewThread(Thread thread);
    //广播心跳包进行数据传输的应答
    public void startKeepAliveThread(Thread thread);
    //将车间传输的数据进行解析封装成xml格式
    public String parseXmlDataFromFactory(Object object);
    //将xml格式数据上传到数据中心
    public boolean sendXmlDataToCenter(String data);
}
