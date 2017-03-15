package com.uestc.cablebigdata.model.view;

/**
 * Created by Administrator on 2017/3/15.
 */
public class BDAnysisResult<T> {
    private boolean sucess;
    private T data;
    private String error;

    public BDAnysisResult(boolean sucess, T data) {
        this.sucess = sucess;
        this.data = data;
    }

    public BDAnysisResult(boolean sucess, String error) {
        this.sucess = sucess;
        this.error = error;
    }

    public boolean isSucess() {
        return sucess;
    }

    public void setSucess(boolean sucess) {
        this.sucess = sucess;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
