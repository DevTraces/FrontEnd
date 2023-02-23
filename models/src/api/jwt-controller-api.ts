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
import { ApiSuccessResponseobject } from '../../src/model';
/**
 * JwtControllerApi - axios parameter creator
 * @export
 */
export const JwtControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary reissue
         * @param {string} authorization authorization
         * @param {string} [refreshToken] refreshToken
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reissueUsingPOST: async (authorization: string, refreshToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authorization' is not null or undefined
            assertParamExists('reissueUsingPOST', 'authorization', authorization)
            const localVarPath = `/api/tokens/reissue`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(refreshToken, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * JwtControllerApi - functional programming interface
 * @export
 */
export const JwtControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = JwtControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary reissue
         * @param {string} authorization authorization
         * @param {string} [refreshToken] refreshToken
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reissueUsingPOST(authorization: string, refreshToken?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiSuccessResponseobject>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reissueUsingPOST(authorization, refreshToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * JwtControllerApi - factory interface
 * @export
 */
export const JwtControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = JwtControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary reissue
         * @param {string} authorization authorization
         * @param {string} [refreshToken] refreshToken
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reissueUsingPOST(authorization: string, refreshToken?: string, options?: any): AxiosPromise<ApiSuccessResponseobject> {
            return localVarFp.reissueUsingPOST(authorization, refreshToken, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * JwtControllerApi - object-oriented interface
 * @export
 * @class JwtControllerApi
 * @extends {BaseAPI}
 */
export class JwtControllerApi extends BaseAPI {
    /**
     * 
     * @summary reissue
     * @param {string} authorization authorization
     * @param {string} [refreshToken] refreshToken
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof JwtControllerApi
     */
    public reissueUsingPOST(authorization: string, refreshToken?: string, options?: AxiosRequestConfig) {
        return JwtControllerApiFp(this.configuration).reissueUsingPOST(authorization, refreshToken, options).then((request) => request(this.axios, this.basePath));
    }
}
