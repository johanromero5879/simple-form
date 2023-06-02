const COUNTRIES_API = "https://restcountries.com/v3.1"

export const getCountries = async () => {
    const params = new URLSearchParams({
        fields: "flag,translations"
    })
    const url = `${COUNTRIES_API}/independent?${params}`

    const response = await fetch(url)
    if (response.status >= 400) throw new Error("Error al conectar la API restcountries")

    const data = await response.json()
    const countries = data.map(({ flag, translations }: any) => {
        return {
            name: translations.spa.common,
            flag
        }
    })

    // Sort countries by name
    countries.sort((a: any, b: any) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    })

    return countries
}