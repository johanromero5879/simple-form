import { useState, useEffect } from "react"

import { getCountries } from "@/services"

interface Country {
    name: string
    flag: string
}

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([])

    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        const countries = await getCountries()
        setCountries(countries)
    }

    return { countries }
}