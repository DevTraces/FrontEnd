/* tslint:disable */
/* eslint-disable */
/**
 * 개발자취 - ArtBubble
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../base';
// @ts-ignore
import { ApiSuccessResponseListReplyResponse } from '../../src/model';
// @ts-ignore
import { ApiSuccessResponseReplyResponse } from '../../src/model';
// @ts-ignore
import { ApiSuccessResponseobject } from '../../src/model';
/**
 * ReplyControllerApi - axios parameter creator
 * @export
 */
export const ReplyControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary createReply
         * @param {number} feedId feedId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReplyUsingPOST: async (feedId: number, userId?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'feedId' is not null or undefined
            assertParamExists('createReplyUsingPOST', 'feedId', feedId)
            const localVarPath = `/api/feeds/{feedId}/replies`
                .replace(`{${"feedId"}}`, encodeURIComponent(String(feedId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userId, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary deleteReply
         * @param {number} replyId replyId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReplyUsingDELETE: async (replyId: number, userId?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'replyId' is not null or undefined
            assertParamExists('deleteReplyUsingDELETE', 'replyId', replyId)
            const localVarPath = `/api/feeds/{feedId}/replies/{replyId}`
                .replace(`{${"replyId"}}`, encodeURIComponent(String(replyId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userId, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary getReplyList
         * @param {number} feedId feedId
         * @param {number} page page
         * @param {number} [pageSize] pageSize
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReplyListUsingGET: async (feedId: number, page: number, pageSize?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'feedId' is not null or undefined
            assertParamExists('getReplyListUsingGET', 'feedId', feedId)
            // verify required parameter 'page' is not null or undefined
            assertParamExists('getReplyListUsingGET', 'page', page)
            const localVarPath = `/api/feeds/{feedId}/replies`
                .replace(`{${"feedId"}}`, encodeURIComponent(String(feedId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary updateReply
         * @param {number} replyId replyId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateReplyUsingPUT: async (replyId: number, userId?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'replyId' is not null or undefined
            assertParamExists('updateReplyUsingPUT', 'replyId', replyId)
            const localVarPath = `/api/feeds/{feedId}/replies/{replyId}`
                .replace(`{${"replyId"}}`, encodeURIComponent(String(replyId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userId, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReplyControllerApi - functional programming interface
 * @export
 */
export const ReplyControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReplyControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary createReply
         * @param {number} feedId feedId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createReplyUsingPOST(feedId: number, userId?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSuccessResponseReplyResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createReplyUsingPOST(feedId, userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary deleteReply
         * @param {number} replyId replyId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteReplyUsingDELETE(replyId: number, userId?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSuccessResponseobject>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteReplyUsingDELETE(replyId, userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary getReplyList
         * @param {number} feedId feedId
         * @param {number} page page
         * @param {number} [pageSize] pageSize
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getReplyListUsingGET(feedId: number, page: number, pageSize?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSuccessResponseListReplyResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getReplyListUsingGET(feedId, page, pageSize, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary updateReply
         * @param {number} replyId replyId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateReplyUsingPUT(replyId: number, userId?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSuccessResponseReplyResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateReplyUsingPUT(replyId, userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ReplyControllerApi - factory interface
 * @export
 */
export const ReplyControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReplyControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary createReply
         * @param {number} feedId feedId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReplyUsingPOST(feedId: number, userId?: number, options?: any): AxiosPromise<ApiSuccessResponseReplyResponse> {
            return localVarFp.createReplyUsingPOST(feedId, userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary deleteReply
         * @param {number} replyId replyId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReplyUsingDELETE(replyId: number, userId?: number, options?: any): AxiosPromise<ApiSuccessResponseobject> {
            return localVarFp.deleteReplyUsingDELETE(replyId, userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary getReplyList
         * @param {number} feedId feedId
         * @param {number} page page
         * @param {number} [pageSize] pageSize
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReplyListUsingGET(feedId: number, page: number, pageSize?: number, options?: any): AxiosPromise<ApiSuccessResponseListReplyResponse> {
            return localVarFp.getReplyListUsingGET(feedId, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary updateReply
         * @param {number} replyId replyId
         * @param {number} [userId] userId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateReplyUsingPUT(replyId: number, userId?: number, options?: any): AxiosPromise<ApiSuccessResponseReplyResponse> {
            return localVarFp.updateReplyUsingPUT(replyId, userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReplyControllerApi - object-oriented interface
 * @export
 * @class ReplyControllerApi
 * @extends {BaseAPI}
 */
export class ReplyControllerApi extends BaseAPI {
    /**
     * 
     * @summary createReply
     * @param {number} feedId feedId
     * @param {number} [userId] userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReplyControllerApi
     */
    public createReplyUsingPOST(feedId: number, userId?: number, options?: AxiosRequestConfig) {
        return ReplyControllerApiFp(this.configuration).createReplyUsingPOST(feedId, userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary deleteReply
     * @param {number} replyId replyId
     * @param {number} [userId] userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReplyControllerApi
     */
    public deleteReplyUsingDELETE(replyId: number, userId?: number, options?: AxiosRequestConfig) {
        return ReplyControllerApiFp(this.configuration).deleteReplyUsingDELETE(replyId, userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary getReplyList
     * @param {number} feedId feedId
     * @param {number} page page
     * @param {number} [pageSize] pageSize
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReplyControllerApi
     */
    public getReplyListUsingGET(feedId: number, page: number, pageSize?: number, options?: AxiosRequestConfig) {
        return ReplyControllerApiFp(this.configuration).getReplyListUsingGET(feedId, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary updateReply
     * @param {number} replyId replyId
     * @param {number} [userId] userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReplyControllerApi
     */
    public updateReplyUsingPUT(replyId: number, userId?: number, options?: AxiosRequestConfig) {
        return ReplyControllerApiFp(this.configuration).updateReplyUsingPUT(replyId, userId, options).then((request) => request(this.axios, this.basePath));
    }
}
