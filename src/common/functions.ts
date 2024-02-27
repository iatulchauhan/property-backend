import { Types } from 'mongoose'
import config from 'config'
const Winston: any = config.get('Winston')
const ObjectId = Types.ObjectId

export const apiResponse = async (status, message, data, error) => {
    return {
        status,
        message,
        data: data,
        error: error
    }
}

export const searchInJSONArray = (jsonArray, key, keyword) => {
    return jsonArray.filter(item => item[key].includes(keyword));
}

export const URL_decode = (url) => {
    let folder_name = [], image_name
    url.split("/").map((value, index, arr) => {
        image_name = url.split("/")[url.split("/").length - 1]
        folder_name = (url.split("/"))
        folder_name.splice(url.split("/").length - 1, 1)
    })
    return [folder_name.join('/'), image_name]
}

export const imageFileTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "ico"]

export const image_folder = ['attachment', 'lectureVideo']

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function indexesToJSON(array) {
    const jsonArray = array.map((value, index) => JSON.parse(value));
    return jsonArray;
}

export const findMissingElements = (arr1, arr2) => {
    return arr1.filter(item => !arr2.includes(item));
}