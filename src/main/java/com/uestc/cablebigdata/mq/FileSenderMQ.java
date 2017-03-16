package com.uestc.cablebigdata.mq;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.ActiveMQSession;
import org.apache.activemq.BlobMessage;

import javax.jms.*;
import java.io.File;

/**
 * Created by dsz on 17/3/15.
 */
public class FileSenderMQ {
    public static void startSend(String filePath,String urlPath) throws JMSException {
        File file=new File(filePath);
        //获取ConnectionFactory
        ConnectionFactory connectionFactory=new ActiveMQConnectionFactory(urlPath);
        //创建Connection
        Connection connection=connectionFactory.createConnection();
        connection.start();
        ActiveMQSession session=(ActiveMQSession)connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        Destination destination=session.createQueue("File.Transport");
        MessageProducer producer=session.createProducer(destination);
        //设置持久性，文件先缓存下来，接收端离线再连接也收到文件
        producer.setDeliveryMode(DeliveryMode.PERSISTENT);
        BlobMessage blobMessage = session.createBlobMessage(file);
        blobMessage.setStringProperty("FILE.NAME", file.getName());
        blobMessage.setLongProperty("FILE.SIZE", file.length());
        producer.send(blobMessage);
        producer.close();
        session.close();
        connection.close();
    }

    public static void main(String[]args){
        try {
            startSend(args[0],args[1]);
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
