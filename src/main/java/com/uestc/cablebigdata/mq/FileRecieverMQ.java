package com.uestc.cablebigdata.mq;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.BlobMessage;

import javax.jms.*;

/**
 * Created by dsz on 17/3/15.
 */
public class FileRecieverMQ {
    public static void startRecieveFileMQ(){
        //创建ConnectionFactory
        ConnectionFactory connectionFactory=new ActiveMQConnectionFactory("tcp://59.110.141.196:61616");
        //创建Connection
        try {
            Connection connection=connectionFactory.createConnection();
            connection.start();
            Session session=connection.createSession(false,Session.AUTO_ACKNOWLEDGE);
            //创建Destination
            Destination destination=session.createQueue("File.Transport");
            //创建ConSumer
            MessageConsumer consumer=session.createConsumer(destination);

            consumer.setMessageListener(new MessageListener() {
                public void onMessage(Message message) {
                    if(message instanceof BlobMessage){

                    }
                }
            });

        } catch (JMSException e) {
            e.printStackTrace();
        }


    }
}
