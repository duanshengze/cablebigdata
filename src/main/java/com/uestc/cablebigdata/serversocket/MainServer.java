package com.uestc.cablebigdata.serversocket;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by Administrator on 2017/3/12.
 */
public class MainServer {
    public static void main(String[]args){
        //服务端在20006端口监听客户端请求的TCP连接
        ServerSocket server = null;
        try {
            server = new ServerSocket(20006);
            Socket client = null;
            boolean flag = true;
            while(flag){
                //等待客户端的连接，如果没有获取连接
                client = server.accept();
                System.out.println("与客户端连接成功！");
                //为每个客户端连接开启一个线程
                new Thread(new ServerThread(client)).start();
            }
            server.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
