import { defineStore } from 'pinia';

import { useRoute } from 'vue-router';
import { isArray } from 'element-plus/es/utils/types.mjs';

export const useUtil = defineStore('util', () => {

    const route = useRoute();

    function parseParamString(key: string): string | undefined {
        const result = route.params[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return result[0];
            }
        } else {
            return result;
        }
    }

    function parseParamInt(key: string): number | undefined {
        const result = route.params[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return parseInt(result[0]);
            }
        } else {
            return parseInt(result);
        }
    }

    function parseQueryString(key: string): string | undefined {
        const result = route.query[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return result[0];
            }
        } else {
            return result;
        }
    }

    function parseQueryInt(key: string): number | undefined {
        const result = route.query[key];
    
        if(result === null)
            return undefined;
    
        if(isArray(result)){
            if(!result[0]){
                return undefined;
            } else {
                return parseInt(result[0]);
            }
        } else {
            return parseInt(result);
        }
    }

    return {
        parseParamInt, parseParamString,
        parseQueryInt, parseQueryString
    }
});

