

export interface CreateWeblogBody {
    _id ?: string
    title : string
    text : string
    media ?: string
}

export interface UpdateWeblogBody {
    title ?: string
    text ?: string
    media ?: string
}