package com.uestc.cablebigdata.mq;

import com.uestc.cablebigdata.hadoop.mr.XmlToHbaseMR;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.BlobMessage;

import javax.jms.*;
import java.io.*;

/**
 * Created by dsz on 17/3/15.
 */
public class FileRecieverMQ {
    public static void main(String[]args){
        startRecieveFileMQ(args[0],args[1]);
        //开启mapreduce进行解析
        String tableName=getTableNameByFile(args[0]);
        String[]strings=new String[]{
                args[0],
                tableName
        };
        XmlToHbaseMR.startXmlToHbase(strings);
    }

    /**
     *
     * @param filePath
     * @param urlPath
     */

    public static void startRecieveFileMQ(final String filePath, String urlPath){
        //创建ConnectionFactory
        ConnectionFactory connectionFactory=new ActiveMQConnectionFactory(urlPath);
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
                        BlobMessage blobMessage = (BlobMessage) message;
                        try {
                            String fileName = blobMessage.getStringProperty("FILE.NAME");

                            File file  = new File(filePath);

                            OutputStream os = new FileOutputStream(file);

                            InputStream inputStream = blobMessage.getInputStream();
                            byte[] buff = new byte[256];

                            int len = 0;

                            while ((len = inputStream.read(buff)) > 0) {

                                os.write(buff, 0, len);

                            }

                            os.close();





                        } catch (JMSException e) {
                            e.printStackTrace();
                        }catch (IOException e){
                            e.printStackTrace();
                        }
                    }
                }
            });

        } catch (JMSException e) {
            e.printStackTrace();
        }
    }

    private static String getTableNameByFile(String fileName){
        return  ""+fileName;
    }
}
