
import useHttp from '../hooks/http.hook'

const useMarvelService = () => {

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=3a022a7536748f38218005f5ce9e9975';

    const {loading, error, request, clearError} = useHttp()

    const getAllCharacters = async (limit=9, offset=0) => {
        
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformToChar)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformToChar(res.data.results[0])
    }

    const getAllComics = async (limit = 8, offset) => {
        const res = await request(`${_apiBase}comics?orderBy=modified&limit=${limit}&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformToComics)
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformToComics(res.data.results[0])
    }

    const _transformToChar = (obj) => {
        return {
            name: obj.name,
            description: obj.description,
            thumbnail: `${obj.thumbnail.path}.${obj.thumbnail.extension}`,
            homepage: obj.urls[0].url,
            wiki: obj.urls[1].url,
            id: obj.id,
            comics: obj.comics.items
        }
    }

    const _transformToComics = (data) => {
        return ({
            title: data.title,
            prices: data.prices[0].price,
            img: `${data.images[0]?.path}.${data.images[0]?.extension}`,
            id: data.id,
            description: data.description,
            pages: data.pageCount,
            lang: data.textObjects[0].language,

        })
    } 

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics}
}

export default useMarvelService;