export interface Form {
    id: number
    fullname: string
    country: string
}

export type NewForm = Omit<Form, "id">