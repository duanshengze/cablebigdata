package com.uestc.cablebigdata.hadoop.mr;

import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.io.ImmutableBytesWritable;
import org.apache.hadoop.hbase.mapreduce.TableMapper;

/**
 * Created by dsz on 17/3/15.
 */
public class CleanDataMR {
        public static class CDMapper extends TableMapper<ImmutableBytesWritable, Put>{

        }
}
