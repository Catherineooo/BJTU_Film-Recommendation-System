package com.yan.movielens.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;

/**
 * @author palm
 * http错误处理接口
 */
public class MyRestErrorHandler implements ResponseErrorHandler {

    /**
     * 判断返回结果response是否是异常结果
     * 主要是去检查response 的HTTP Status
     * 仿造DefaultResponseErrorHandler实现即可
     */
    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        int rawStatusCode = response.getRawStatusCode();
        HttpStatus statusCode = HttpStatus.resolve(rawStatusCode);
        return (statusCode != null ? statusCode.isError(): hasError(rawStatusCode));
    }

    protected boolean hasError(int unknownStatusCode) {
        HttpStatus.Series series = HttpStatus.Series.resolve(unknownStatusCode);
        return (series == HttpStatus.Series.CLIENT_ERROR || series == HttpStatus.Series.SERVER_ERROR);
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        // 遇到了Error进行合理的处理
        //TODO 将接口请求的异常信息持久化
    }
}

